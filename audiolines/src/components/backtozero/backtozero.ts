import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { MetronomeProvider } from "../../providers/metronome/metronome";
import { TimelineProvider } from "../../providers/timeline/timeline";

@Component({
  selector: "backtozero",
  templateUrl: "backtozero.html"
})
export class BacktozeroComponent {
  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider,
    public timeLine: TimelineProvider
  ) {}

  onClick() {
    if (this.stateManager.state == "PAUSED") {
      this.stateManager.state = "STOPPED";
      this.timeLine.stop();
    }
  }
}
