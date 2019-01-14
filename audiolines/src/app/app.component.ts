import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import {Storage} from '@ionic/storage';
import {HomePage} from "../pages/home/home";
import {OnboardingComponent} from "../components/onboarding/onboarding";


@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = OnboardingComponent;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      /*if(this.storage.get('showOnboarding') == undefined) {
        alert("No skip!");
        this.rootPage = OnboardingComponent;
        this.storage.set('showOnboarding', false);
      } else {
        alert("skip!");
        this.rootPage = HomePage;
      }*/
      splashScreen.hide();
    });
  }
}
