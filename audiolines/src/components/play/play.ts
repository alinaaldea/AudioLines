import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { TimelineProvider } from "../../providers/timeline/timeline";

/**
 * TODO: Weird thing when looping
 * -> after recording a few tracks it starts looping again and again
 * and it can not be stopped except by deleting the tracks
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
