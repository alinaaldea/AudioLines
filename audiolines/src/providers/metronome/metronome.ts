import { Injectable } from "@angular/core";
import { StateManagerProvider } from "../state-manager/state-manager";

/*
  Generated class for the MetronomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MetronomeProvider {
  metronomeIsPlaying: boolean = false;

  metronomeInterval: any;
  metronomeCounter: number = 0;

  constructor(public stateManager: StateManagerProvider) {
    console.log("Hello MetronomeProvider Provider");
  }

  startMetronome() {
    if (this.stateManager.metronomeIsActive) {
      this.metronomeIsPlaying = true;
      this.playMetronomeAudio();
      this.metronomeInterval = setInterval(() => {
        this.playMetronomeAudio();
      }, this.stateManager.bpmObject.ms);
    }
  }

  stopMetronome() {
    clearInterval(this.metronomeInterval);
    this.metronomeCounter = 0;
  }

  playMetronomeAudio() {
    if (
      (this.stateManager.state == "PLAYING" ||
        this.stateManager.state == "RECORDING") &&
      this.stateManager.metronomeIsActive
    ) {
      if (this.metronomeCounter % 4 == 0) {
        let audio = new Audio("assets/sounds/metronome_high.mp3");
        audio.volume = 1;
        audio.play();
        this.metronomeCounter++;
      } else {
        let audio = new Audio("assets/sounds/metronome_low.mp3");
        audio.volume = 1;
        audio.play();
        this.metronomeCounter++;
      }
    }
  }
}
