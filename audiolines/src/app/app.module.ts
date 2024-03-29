import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Media } from "@ionic-native/media";
import { File } from "@ionic-native/file";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";

import { RecordingComponent } from "../components/recording/recording";
import { PlayComponent } from "../components/play/play";
import { BacktozeroComponent } from "../components/backtozero/backtozero";
import { WavesListComponent } from "../components/waves-list/waves-list";
import { WavesListItemComponent } from "../components/waves-list-item/waves-list-item";
import { SetBpmComponent } from "../components/set-bpm/set-bpm";
import { SetBpmViewComponent } from "../components/set-bpm-view/set-bpm-view";
import { ExportComponent } from "../components/export/export";
import { ExportViewComponent } from "../components/export-view/export-view";
import { MetronomeToggleComponent } from "../components/metronome-toggle/metronome-toggle";

import { StateManagerProvider } from "../providers/state-manager/state-manager";
import { BpmProvider } from "../providers/bpm/bpm";
import { MetronomeProvider } from "../providers/metronome/metronome";
import { TimelineProvider } from "../providers/timeline/timeline";
import { FileChooser } from "@ionic-native/file-chooser";
import { SocialSharing } from "@ionic-native/social-sharing";
import { NgProgressModule } from "ngx-progressbar";
import "hammerjs";
import {OnboardingComponent} from "../components/onboarding/onboarding";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecordingComponent,
    PlayComponent,
    BacktozeroComponent,
    OnboardingComponent,
    WavesListComponent,
    WavesListItemComponent,
    MetronomeToggleComponent,
    SetBpmComponent,
    SetBpmViewComponent,
    ExportComponent,
    ExportViewComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), NgProgressModule, IonicStorageModule.forRoot()],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, OnboardingComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Media,
    File,
    FileChooser,
    SocialSharing,
    StateManagerProvider,
    BpmProvider,
    MetronomeProvider,
    TimelineProvider
    // Platform,
  ]
})
export class AppModule {}
