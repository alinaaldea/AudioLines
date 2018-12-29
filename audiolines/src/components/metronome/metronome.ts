import { Component } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";

/**
 * Generated class for the MetronomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "metronome",
  templateUrl: "metronome.html"
})
export class MetronomeComponent {
  metronomeIsPlaying: boolean = false;

  metronomeInterval: any;
  metronomeCounter: number = 0;

  constructor(public stateManager: StateManagerProvider) {}

  toggleMetronome() {
    this.stateManager.metronomeIsActive = !this.stateManager.metronomeIsActive;
    if (this.stateManager.metronomeIsActive) this.startMetronome();
    else if (!this.stateManager.metronomeIsActive) this.stopMetronome();
  }

  startMetronome() {
    if (this.stateManager.metronomeIsActive) {
      this.metronomeIsPlaying = true;
      this.playAudio();
      this.metronomeInterval = setInterval(() => {
        this.playAudio();
      }, this.stateManager.bpmObject.ms);
    }
  }

  stopMetronome() {
    clearInterval(this.metronomeInterval);
  }

  playAudio() {
    if (
      this.stateManager.state == "PLAYING" &&
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
