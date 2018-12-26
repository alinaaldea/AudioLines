import { Component } from "@angular/core";

/**
 * Generated class for the MetronomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "metronome",
  templateUrl: "metronome.html"
})
export class MetronomeComponent {
  isActive: boolean = false;

  onClick() {
    this.isActive = !this.isActive;
  }
}
