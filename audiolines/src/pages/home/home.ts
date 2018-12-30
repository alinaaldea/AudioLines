import { Component, DoCheck } from "@angular/core";
import { NavController } from "ionic-angular";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";

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
