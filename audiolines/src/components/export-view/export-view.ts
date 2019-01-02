import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "export-view",
  templateUrl: "export-view.html"
})
export class ExportViewComponent {
  constructor(public stateManager: StateManagerProvider) {}
}
