import {Component, Input} from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { MetronomeProvider } from "../../providers/metronome/metronome";

@Component({
  selector: "metronome-toggle",
  templateUrl: "metronome-toggle.html"
})

export class MetronomeToggleComponent {
  @Input() disabled: boolean = false;
  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider
  ) {}

  toggleMetronome() {
    this.stateManager.metronomeIsActive = !this.stateManager.metronomeIsActive;
    if (!this.disabled &&
      this.stateManager.metronomeIsActive &&
      (this.stateManager.state == "PLAYING" ||
        this.stateManager.state == "RECORDING")
    )
      this.metronome.startMetronome();
    if (!this.stateManager.metronomeIsActive) this.metronome.stopMetronome();
  }
}
