import { Component, DoCheck } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";

/**
 * Generated class for the BacktozeroComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "backtozero",
  templateUrl: "backtozero.html"
})
export class BacktozeroComponent implements DoCheck {
  constructor(public stateManager: StateManagerProvider) {}

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    // console.log("[BACKTOZERO]: " + this.stateManager.state);
  }
}
