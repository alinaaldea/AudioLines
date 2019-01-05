import { Component } from "@angular/core";

import { ToastController } from "ionic-angular";
import { File } from "@ionic-native/file";
import { Media } from "@ionic-native/media";
import { SocialSharing } from "@ionic-native/social-sharing";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

declare var lamejs: any;

/**
 * TODO: EXPORT NameInput and Files (REQUIRED)
 *
 * The export functionality is working but right now its taking 2 files
 * that are pre-located in the @param filePath and then rendering the merged file
 * in there too with a predefined name.
 *
 * The files that are going to be merged need to be checked by their status
 * -> if they're all active -> export all
 * -> if one or more are soloed -> export only the soloed
 * -> if one or more are muted -> dont export them.
 * ERRORCASES:
 * -> if there are no tracks yet -> SEND WARNING AND DONT EXPORT!
 * -> if all tracks are muted -> SEND WARNING AND DONT EXPORT!
 */

/**
 * TODO: Export-Status Progress (OPTIONAL)
 *
 * for the UX it would be nice too see some kind of progressbar for the exporting
 * right now its just waiting until its done after about 10-15 seconds
 */

/**
 * TODO: EXPORTED TAB (OPTIONAL)
 *
 * Tab to show all the exported files that are still on the device.
 * From there
 * -> every track can be listened to directly from the app
 * -> every track can be shared again directly from the app
 */
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
    public media: Media
  ) {}

  exportFile() {
    // path to folder on android filesystem
    let filePath: string =
      this.file.externalApplicationStorageDirectory + "/files";

    // to be replaced by recordings!
    let fileNames: string[] = ["piano.mp3", "stabs.mp3"];

    let audioCtx: AudioContext = new AudioContext();
    let sources: AudioBufferSourceNode[] = [];
    let buffers: ArrayBuffer[] = [];

    let promises = [];
    fileNames.map(fileName => {
      promises.push(
        this.file
          .readAsArrayBuffer(filePath, fileName)
          .then(async (buffer: ArrayBuffer) => {
            alert("FILE " + fileName + " FOUND");
            buffers.push(buffer);
            await audioCtx
              .decodeAudioData(buffer)
              .then((decodedBuffer: AudioBuffer) => {
                alert("SOURCE " + fileName);
                let source: AudioBufferSourceNode = audioCtx.createBufferSource();
                source.buffer = decodedBuffer;
                source.connect(audioCtx.destination);
                sources.push(source);
              })
              .catch(e => {
                alert(e);
              });
          })
          .catch(e => {
            alert(e);
          })
      );
    });

    Promise.all(promises)
      .then(() => {
        alert("TEST / " + sources.length);
        // mixes the AudioBuffers in sources and creates 1 AudioBuffer
        let context: AudioBuffer = this.mix(sources, audioCtx);
        alert("BUFFER?");
        let mixedSource: AudioBufferSourceNode = audioCtx.createBufferSource();
        mixedSource.buffer = context;
        mixedSource.connect(audioCtx.destination);
        // mixedSource.start();

        let blob: Blob = this.generateMp3(mixedSource.buffer);
        this.writeFileToSystem(filePath, blob);
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
    var nbBuffer = buffers.length;
    // Get the maximum number of channels across all buffers
    var maxChannels = 0;
    // Get the maximum length
    var maxDuration = 0;

    for (var i = 0; i < nbBuffer; i++) {
      if (buffers[i].buffer.numberOfChannels > maxChannels) {
        maxChannels = buffers[i].buffer.numberOfChannels;
      }
      if (buffers[i].buffer.duration > maxDuration) {
        maxDuration = buffers[i].buffer.duration;
      }
    }

    // Get the output buffer (which is an array of datas) with the right number of channels and size/duration
    var mixed = context.createBuffer(
      maxChannels,
      context.sampleRate * maxDuration,
      context.sampleRate
    );

    for (var j = 0; j < nbBuffer; j++) {
      // For each channel contained in a buffer...
      for (
        var srcChannel = 0;
        srcChannel < buffers[j].buffer.numberOfChannels;
        srcChannel++
      ) {
        // Get the channel we will mix into
        var _out = mixed.getChannelData(srcChannel);
        // Get the channel we want to mix in
        var _in = buffers[j].buffer.getChannelData(srcChannel);

        for (var i = 0; i < _in.length; i++) {
          // Calculate the new value for each index of the buffer array
          _out[i] += _in[i];
        }
      }
    }
    return mixed;
  }
}
