import { Component, AfterViewInit } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";

/**
 * Generated class for the WavesListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "waves-list",
  templateUrl: "waves-list.html"
})
export class WavesListComponent implements AfterViewInit {
  constructor(public stateManager: StateManagerProvider) {}

  ngAfterViewInit(): void {}
}
