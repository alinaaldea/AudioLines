import { Component } from "@angular/core";

import { File } from "@ionic-native/file";
import { Media } from "@ionic-native/media";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { File } from "@ionic-native/file";
import { Media } from "@ionic-native/media";

declare var lamejs: any;

@Component({
  selector: "export-view",
  templateUrl: "export-view.html"
})
export class ExportViewComponent {
  constructor(
    public stateManager: StateManagerProvider,
    public file: File,
    public media: Media
  ) {}

  storeFiles() {
    alert("WOULD BE EXPORTING NOW!");
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
