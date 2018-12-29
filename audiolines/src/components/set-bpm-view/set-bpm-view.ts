import { Component } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { BpmProvider } from "../../providers/bpm/bpm";

/**
 * Generated class for the SetBpmViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "set-bpm-view",
  templateUrl: "set-bpm-view.html"
})
export class SetBpmViewComponent {
  constructor(
    public stateManager: StateManagerProvider,
    private bpm: BpmProvider
  ) {}

  onTap() {
    this.stateManager.bpmObject = this.bpm.tap();
  }
}
