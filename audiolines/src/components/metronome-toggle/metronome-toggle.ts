import { Component } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { MetronomeProvider } from "../../providers/metronome/metronome";

/**
 * Generated class for the MetronomeToggleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "metronome-toggle",
  templateUrl: "metronome-toggle.html"
})
export class MetronomeToggleComponent {
  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider
  ) {}

  toggleMetronome() {
    this.stateManager.metronomeIsActive = !this.stateManager.metronomeIsActive;
    // if (
    //   this.stateManager.metronomeIsActive &&
    //   (this.stateManager.state == "PLAYING" ||
    //     this.stateManager.state == "RECORDING")
    // )
    //   this.metronome.startMetronome();
    if (!this.stateManager.metronomeIsActive) this.metronome.stopMetronome();
  }
}
