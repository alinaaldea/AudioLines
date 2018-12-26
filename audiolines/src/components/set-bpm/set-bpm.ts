import { Component } from "@angular/core";

/**
 * Generated class for the SetBpmComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "set-bpm",
  templateUrl: "set-bpm.html"
})
export class SetBpmComponent {
  state: string = "idle";
  bpmNumber: number = 100;

  onClick() {
    if (this.state == "idle") this.state = "active";
    else if (this.state == "active") this.state = "idle";
  }
}
