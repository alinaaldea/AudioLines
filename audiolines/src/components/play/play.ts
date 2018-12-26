import { Component } from "@angular/core";

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
  state: string = "paused";

  onClick() {
    if (this.state == "paused") this.state = "playing";
    else if (this.state == "playing") this.state = "paused";
  }
}
