import { Component } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { MetronomeProvider } from "../../providers/metronome/metronome";

/**
 * Generated class for the WavesListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "waves-list-item",
  templateUrl: "waves-list-item.html"
})
export class WavesListItemComponent {
  menuIsOpen: boolean = false;

  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider
  ) {}

  onClick() {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
