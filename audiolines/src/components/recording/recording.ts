import { Component } from "@angular/core";

import { Media } from "@ionic-native/media";
import { File } from "@ionic-native/file";

import {
  StateManagerProvider,
  track
} from "../../providers/state-manager/state-manager";
import { TimelineProvider } from "../../providers/timeline/timeline";

/**
 * TODO: if Metronome is active ->
 * count 1 measure (4 BEATS) before the app starts recording
 *
 * right now that leads to a UX problem:
 * -> if the user starts to play without having recorded anything
 * the record-button gets greyed out.
 * this should not be happening until the user has recorded at least 1 track
 */
@Component({
  selector: "recording",
  templateUrl: "recording.html"
})
export class RecordingComponent {
  filePath: string;
  fileName: string;

  constructor(
    public stateManager: StateManagerProvider,
    public timeLine: TimelineProvider,
    public media: Media,
    public file: File
  ) {}

  startRecord() {
    if (this.stateManager.state == "STOPPED") {
      alert("Would be recording now!");
      this.timeLine.start();
      this.stateManager.state = "RECORDING";
    }
  }

  stopRecord() {
    if (this.stateManager.state == "RECORDING") {
      this.stateManager.state = "STOPPED";
      this.timeLine.stop();
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
    console.log(this.stateManager.showStateManagerAsObject());
  }
}
