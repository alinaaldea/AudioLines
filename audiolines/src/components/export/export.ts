import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "export",
  templateUrl: "export.html"
})
export class ExportComponent {
  constructor(public stateManager: StateManagerProvider) {}

  onClick() {
    if (this.stateManager.state == "STOPPED") {
      this.stateManager.state = "EXPORT";
    } else if (this.stateManager.state == "EXPORT") {
      this.stateManager.state = "STOPPED";
    }
  }
}
