import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "set-bpm",
  templateUrl: "set-bpm.html"
})
export class SetBpmComponent {
  constructor(public stateManager: StateManagerProvider) {}

  onClick() {
    if (this.stateManager.state == "STOPPED") {
      this.stateManager.state = "BPM";
    } else if (this.stateManager.state == "BPM") {
      this.stateManager.state = "STOPPED";
    }
  }
}
