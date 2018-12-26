import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
// import { Media } from "@ionic-native/media";
// import { File } from "@ionic-native/file";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";

import { RecordingComponent } from "../components/recording/recording";
import { PlayComponent } from "../components/play/play";
import { BacktozeroComponent } from "../components/backtozero/backtozero";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecordingComponent,
    PlayComponent,
    BacktozeroComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
    // Platform,
    // Media,
    // File
  ]
})
export class AppModule {}
