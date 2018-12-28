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
import { WavesListComponent } from "../components/waves-list/waves-list";
import { WavesListItemComponent } from "../components/waves-list-item/waves-list-item";
import { MetronomeComponent } from "../components/metronome/metronome";
import { SetBpmComponent } from "../components/set-bpm/set-bpm";
import { SetBpmViewComponent } from "../components/set-bpm-view/set-bpm-view";
import { ExportComponent } from "../components/export/export";
import { ExportViewComponent } from "../components/export-view/export-view";

import { StateManagerProvider } from "../providers/state-manager/state-manager";
import { BpmProvider } from "../providers/bpm/bpm";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecordingComponent,
    PlayComponent,
    BacktozeroComponent,
    WavesListComponent,
    WavesListItemComponent,
    MetronomeComponent,
    SetBpmComponent,
    SetBpmViewComponent,
    ExportComponent,
    ExportViewComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StateManagerProvider,
    BpmProvider
    // Platform,
    // Media,
    // File
  ]
})
export class AppModule {}
