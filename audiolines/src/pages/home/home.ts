import { Component, DoCheck } from "@angular/core";
import { NavController } from "ionic-angular";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";

/**
 * TODO: PORTRAIT MODE!!
 * TODO: METRONOME REMAINS ACTIVE AFTER RECORDING
 * TODO: DELETE TRACK DOESNT ACTUALLY DELETE TRACK -> ONLY WAVESURFER
 */
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements DoCheck {
  constructor(
    public navCtrl: NavController,
    public stateManager: StateManagerProvider
  ) {}

  ngDoCheck(): void {
    // console.log(this.stateManager.showStateManagerAsObject());
  }
}
