import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { MetronomeProvider } from "../../providers/metronome/metronome";
import { TimelineProvider } from "../../providers/timeline/timeline";

@Component({
  selector: "play",
  templateUrl: "play.html"
})
export class PlayComponent {
  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider,
    public timeLine: TimelineProvider
  ) {}

  onClick() {
    if (this.stateManager.state == "IDLE") {
      this.stateManager.state = "PLAYING";
      this.stateManager.tracks.forEach(track => {
        track.trackData.play();
      });
      this.timeLine.start();
    } else if (this.stateManager.state == "PLAYING") {
      this.stateManager.state = "IDLE";
      this.stateManager.tracks.forEach(track => {
        track.trackData.pause();
      });
      this.timeLine.pause();
    }
  }
}
