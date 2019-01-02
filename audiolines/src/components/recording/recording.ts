import { Component } from "@angular/core";

import { Media } from "@ionic-native/media";
import { File } from "@ionic-native/file";

import {
  StateManagerProvider,
  track
} from "../../providers/state-manager/state-manager";
import { MetronomeProvider } from "../../providers/metronome/metronome";

@Component({
  selector: "recording",
  templateUrl: "recording.html"
})
export class RecordingComponent {
  filePath: string;
  fileName: string;

  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider,
    public media: Media,
    public file: File
  ) {}

  startRecord() {
    if (this.stateManager.state == "IDLE") {
      alert("Would be recording now!");
      this.stateManager.state = "RECORDING";
    }
  }

  stopRecord() {
    if (this.stateManager.state == "RECORDING") {
      this.stateManager.state = "IDLE";
      this.createTrack("piano.mp3", this.stateManager.tracks.length + 1); //trackID starts at 1
    }
  }

  createTrack(file, idx) {
    let track: track = {
      id: idx,
      fileName: file,
      state: "ACTIVE" //possible states: "ACTIVE","TRACK_MUTE" or "TRACK_SOLO"
    };
    this.stateManager.tracks.push(track);
  }
}
