import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { TimelineProvider } from "../../providers/timeline/timeline";

/**
 * TODO: Synchronized looping
 *
 * tracks will probably have different durations
 * so:
 * -> while playing the longest track must be the "master track"
 * -> while recording:
 *    -> if the recorded track going to be longer than the longest track
 *       -> continue recording and set the new track as "master track"
 *    -> if the recorded track is shorter than the longest track
 *       -> keep everything as it is
 */

@Component({
  selector: "play",
  templateUrl: "play.html"
})
export class PlayComponent {
  constructor(
    public stateManager: StateManagerProvider,
    public timeLine: TimelineProvider
  ) {}

  onClick() {
    if (
      this.stateManager.state == "STOPPED" ||
      this.stateManager.state == "PAUSED"
    ) {
      this.stateManager.state = "PLAYING";
      this.timeLine.start();
    } else if (this.stateManager.state == "PLAYING") {
      this.stateManager.state = "PAUSED";
      this.timeLine.pause();
    }
  }
}
