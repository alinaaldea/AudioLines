import { Component, DoCheck } from "@angular/core";
import { NavController } from "ionic-angular";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

/**
 * TODO: DELETE TRACK DOESNT ACTUALLY DELETE TRACK
 *
 * right now if a track gets deleted it only deletes the WaveSurfer-Part
 * means it doesnt get displayed anymore but the data from Tone.js
 * and the actual recording on the phone are still there.
 * This can lead to performance issues and storage of useless data.
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

  ngDoCheck() {
    console.log(this.stateManager.showStateManagerAsObject());
  }
}
