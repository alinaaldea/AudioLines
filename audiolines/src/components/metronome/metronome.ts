import { Component, DoCheck } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";

/**
 * Generated class for the MetronomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "metronome",
  templateUrl: "metronome.html"
})
export class MetronomeComponent implements DoCheck {
  isActive: boolean = false;

  constructor(public stateManager: StateManagerProvider) {}

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    // console.log("[PLAY]: " + this.stateManager.state);
  }

  onClick() {
    this.isActive = !this.isActive;
  }
}
