import { Component, DoCheck } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";

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
    }
  }
}
