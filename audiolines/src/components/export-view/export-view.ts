import { Component } from "@angular/core";

import { ToastController } from "ionic-angular";
import { File } from "@ionic-native/file";
import { Media } from "@ionic-native/media";
import { SocialSharing } from "@ionic-native/social-sharing";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

import { NgProgress } from "ngx-progressbar";
declare var lamejs: any;

@Component({
  selector: "export-view",
  templateUrl: "export-view.html"
})
export class ExportViewComponent {
  chosenFileName: string = "myRecording";
  private versionCounter: number = 0;
  private nativeUrl = "";

  constructor(
    public stateManager: StateManagerProvider,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    public file: File,
    public media: Media,
    public ngProgress: NgProgress
  ) {}

  exportFile() {
    // path to folder on android filesystem
    let filePath: string =
      this.file.externalApplicationStorageDirectory + "/files";

    let fileNames: string[] = [];

    //add all active tracks to array, ignoring mute tracks and if a track is set on solo, it will stand alone in array
    this.stateManager.tracks.forEach(track => {
      switch (track.state) {
        case "ACTIVE":
          fileNames.push(track.fileName);
          break;
        case "TRACK_MUTE":
          break;
        case "TRACK_SOLO":
          fileNames.push(track.fileName);
          return;
      }
    });

    if (fileNames.length == 0) {
      //Display toast with warning
      this.presentToast("No files to export found!");
      //alert("No files to export found!");
      return;
    } else {
      this.ngProgress.start();
      // this.presentToast(`Filenames: ${fileNames}`);
      //alert(`Filenames: ${fileNames}`);
    }

    let audioCtx: AudioContext = new AudioContext();
    let sources: AudioBufferSourceNode[] = [];
    let buffers: ArrayBuffer[] = [];

    let promises = [];
    fileNames.map(fileName => {
      promises.push(
        this.file
          .readAsArrayBuffer(filePath, fileName)
          .then(async (buffer: ArrayBuffer) => {
            // alert("FILE " + fileName + " FOUND");
            buffers.push(buffer);
            await audioCtx
              .decodeAudioData(buffer)
              .then((decodedBuffer: AudioBuffer) => {
                // alert("SOURCE " + fileName);
                let source: AudioBufferSourceNode = audioCtx.createBufferSource();
                source.buffer = decodedBuffer;
                source.connect(audioCtx.destination);
                sources.push(source);
              })
              .catch(e => {
                alert(e);
                //alert("Test 1");
              });
          })
          .catch(e => {
            this.presentToast(
              "No wright-right were given, exported track can not be saved!"
            );
            //alert(e);
          })
      );
    });

    Promise.all(promises)
      .then(() => {
        // alert("TEST / " + sources.length);
        // mixes the AudioBuffers in sources and creates 1 AudioBuffer
        let context: AudioBuffer = this.mix(sources, audioCtx);
        // alert("BUFFER?");
        let mixedSource: AudioBufferSourceNode = audioCtx.createBufferSource();
        mixedSource.buffer = context;
        mixedSource.connect(audioCtx.destination);
        // mixedSource.start();

        let blob: Blob = this.generateMp3(mixedSource.buffer);
        this.writeFileToSystem(filePath, blob);
        this.ngProgress.done();
      })
      .catch();
  }

  shareFile() {
    if (this.nativeUrl == "") {
      alert("Export a file first!");
    } else {
      this.socialSharing
        .share("", "", this.nativeUrl, "")
        .then(() => {
          alert("Sharing works!");
        })
        .catch();
    }
  }

  private writeFileToSystem(filePath: string, blob: Blob, version?: string) {
    if (version == undefined) version = "";

    this.file
      .writeFile(filePath, this.chosenFileName + version + ".mp3", blob)
      .then(file => {
        this.toastCtrl
          .create({
            message:
              "New File: '" +
              this.chosenFileName +
              version +
              ".mp3'" +
              " created!",
            duration: 3000,
            position: "bottom",
            showCloseButton: true
          })
          .present();
        this.versionCounter = 0;
        this.nativeUrl = file.nativeURL;
      })
      .catch(e => {
        if (e.message == "PATH_EXISTS_ERR") {
          this.writeFileToSystem(filePath, blob, "-" + ++this.versionCounter);
        }
      });
  }

  private generateMp3(context: AudioBuffer): Blob {
    let channels = 1; //1 for Mono
    let sampleRate = 48000; //48kHz
    let kbps = 320; //encode 320kbps mp3
    let mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
    let mp3Data = [];

    let sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier

    let data = context.getChannelData(0);
    let len = data.length,
      i = 0;
    let dataAsInt16Array = new Int16Array(len);

    while (i < len) {
      dataAsInt16Array[i] = convert(data[i++]);
    }
    function convert(n) {
      var v = n < 0 ? n * 32768 : n * 32767; // convert in range [-32768, 32767]
      return Math.max(-32768, Math.min(32768, v)); // clamp
    }

    let samples = dataAsInt16Array;

    mp3Data = [];
    for (let j = 0; j < samples.length; j += sampleBlockSize) {
      let sampleChunk = samples.subarray(j, j + sampleBlockSize);
      let mp3buf = mp3encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }

    let mp3buf = mp3encoder.flush(); //finish writing mp3

    if (mp3buf.length > 0) {
      mp3Data.push(new Int8Array(mp3buf));
    }

    return new Blob(mp3Data, { type: "audio/mpeg" });
  }

  private mix(
    buffers: AudioBufferSourceNode[],
    context: AudioContext
  ): AudioBuffer {
    // Get the number of buffer contained in the array buffers
    let nbBuffer = buffers.length;
    // Get the maximum number of channels across all buffers
    let maxChannels = 0;
    // Get the maximum length
    let maxDuration = 0;

    for (let i = 0; i < nbBuffer; i++) {
      if (buffers[i].buffer.numberOfChannels > maxChannels) {
        maxChannels = buffers[i].buffer.numberOfChannels;
      }
      if (buffers[i].buffer.duration > maxDuration) {
        maxDuration = buffers[i].buffer.duration;
      }
    }

    // Get the output buffer (which is an array of datas) with the right number of channels and size/duration
    let mixed = context.createBuffer(
      maxChannels,
      context.sampleRate * maxDuration,
      context.sampleRate
    );

    for (let j = 0; j < nbBuffer; j++) {
      // For each channel contained in a buffer...
      for (
        let srcChannel = 0;
        srcChannel < buffers[j].buffer.numberOfChannels;
        srcChannel++
      ) {
        // Get the channel we will mix into
        let _out = mixed.getChannelData(srcChannel);
        // Get the channel we want to mix in
        let _in = buffers[j].buffer.getChannelData(srcChannel);

        for (let i = 0; i < _in.length; i++) {
          // Calculate the new value for each index of the buffer array
          _out[i] += _in[i];
        }
      }
    }
    return mixed;
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });
    toast.present();
  }
}
