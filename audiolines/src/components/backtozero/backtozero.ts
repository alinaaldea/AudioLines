import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "backtozero",
  templateUrl: "backtozero.html"
})
export class BacktozeroComponent {
  constructor(public stateManager: StateManagerProvider) {}
}
