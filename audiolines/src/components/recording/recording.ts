import { Component, DoCheck } from "@angular/core";
import {
  StateManagerProvider,
  track
} from "../../providers/state-manager/state-manager";

/**
 * Class for the RecordingComponent.
 *
 */
@Component({
  selector: "recording",
  templateUrl: "recording.html"
})
export class RecordingComponent implements DoCheck {
  // !!!! implemented in branch "recording-functionality" !!!
  // you can use this class to simulate the recording
  // and then reading the files to implement the wave thing

  constructor(public stateManager: StateManagerProvider) {}

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    // console.log("[RECORDING]: " + this.stateManager.state);
  }

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
    let filePath = "assets/";
    let track: track = {
      id: idx,
      pathToRecording: filePath + file,
      state: "ACTIVE" //possible states: "ACTIVE","TRACK_MUTE" or "TRACK_SOLO"
    };
    this.stateManager.tracks.push(track);
  }
}
