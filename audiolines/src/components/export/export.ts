import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "export",
  templateUrl: "export.html"
})
export class ExportComponent {
  //ALREADY IMPLEMENTED IN BRANCH EXPORT-FUNCTIONALITY
  constructor(public stateManager: StateManagerProvider) {}

  onClick() {
    if (this.stateManager.state == "IDLE") {
      this.stateManager.state = "EXPORT";
    } else if (this.stateManager.state == "EXPORT") {
      this.stateManager.state = "IDLE";
    }
  }
}
