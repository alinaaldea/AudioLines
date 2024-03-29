import { Storage } from "@ionic/storage";
import { NavController } from "ionic-angular";
import { Slides } from "ionic-angular";

import { Component } from "@angular/core";
import { ViewChild } from "@angular/core";

import { HomePage } from "../../pages/home/home";

@Component({
  selector: "onboarding",
  templateUrl: "onboarding.html"
})
export class OnboardingComponent {
  @ViewChild(Slides) slides: Slides;
  public skipMsg: string = "Skip";

  constructor(public navCtrl: NavController, private storage: Storage) {}

  ngOnInit() {}

  public skip() {
    this.storage
      .set("showOnboarding", false)
      .then(() => {
        this.storage.get("showOnboarding").then(value => {
          console.log(value);
          this.navCtrl.push(HomePage);
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  slideChanged() {
    if (this.slides.isEnd()) this.skipMsg = "Alright, I got it";
  }
}
