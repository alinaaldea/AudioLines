import { Component, AfterViewInit } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "waves-list",
  templateUrl: "waves-list.html"
})
export class WavesListComponent implements AfterViewInit {
  constructor(public stateManager: StateManagerProvider) {}

  ngAfterViewInit(): void {}
}
