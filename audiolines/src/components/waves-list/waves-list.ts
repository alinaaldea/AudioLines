import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "waves-list",
  templateUrl: "waves-list.html"
})
export class WavesListComponent {
  constructor(public stateManager: StateManagerProvider) {}
}
