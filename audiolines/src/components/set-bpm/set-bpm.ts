import { Component, DoCheck } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";

/**
 * Generated class for the SetBpmComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "set-bpm",
  templateUrl: "set-bpm.html"
})
export class SetBpmComponent implements DoCheck {
  constructor(public stateManager: StateManagerProvider) {}

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    // console.log("[SET-BPM]: " + this.stateManager.state);
  }

  onClick() {
    if (this.stateManager.state == "IDLE") {
      this.stateManager.state = "BPM";
    } else if (this.stateManager.state == "BPM") {
      this.stateManager.state = "IDLE";
    }
  }
}
