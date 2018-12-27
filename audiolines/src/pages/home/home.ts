import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public stateManager: StateManagerProvider
  ) {}
}
