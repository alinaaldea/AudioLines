import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from "@ionic/storage";
import { HomePage } from "../pages/home/home";
import { OnboardingComponent } from "../components/onboarding/onboarding";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      splashScreen.hide();
      //check if Onboarding should be displayed
      this.storage
        .ready()
        .then(() => {
          this.storage
            .get("showOnboarding")
            .then(valueOfKey => {
              if (valueOfKey == null || valueOfKey == true) {
                this.storage
                  .set("showOnboarding", true)
                  .then(() => {
                    this.rootPage = OnboardingComponent;
                  })
                  .catch();
              } else if (valueOfKey == false) {
                this.rootPage = HomePage;
              }
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    });
  }
}
