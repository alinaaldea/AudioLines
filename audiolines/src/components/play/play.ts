import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { MetronomeProvider } from "../../providers/metronome/metronome";

/**
 * Generated class for the PlayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "play",
  templateUrl: "play.html"
})
export class PlayComponent {
  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider
  ) {}

  onClick() {
    if (this.stateManager.state == "IDLE") {
      this.stateManager.state = "PLAYING";
      if (this.stateManager.metronomeIsActive) {
        this.metronome.startMetronome();
      }
    } else if (this.stateManager.state == "PLAYING") {
      this.stateManager.state = "IDLE";
      this.metronome.stopMetronome();
    }
  }
}
