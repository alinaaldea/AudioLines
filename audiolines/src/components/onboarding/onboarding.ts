import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'onboarding',
  templateUrl: 'onboarding.html'
})
export class OnboardingComponent {

  @ViewChild(Slides) slides: Slides;
  public skipMsg: string = "Skip";

  constructor(public navCtrl: NavController) {
  }

  ngOnInit(){
  }

  public skip() {
    this.navCtrl.push(HomePage);
  }

  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Alright, I got it";
  }

}
