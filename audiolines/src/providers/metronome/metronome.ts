import { Injectable, OnDestroy } from "@angular/core";
import { StateManagerProvider } from "../state-manager/state-manager";

import { Observable, Subscription, Scheduler } from "rxjs/Rx";

/*
  Generated class for the MetronomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MetronomeProvider implements OnDestroy {
  metronomeIsPlaying: boolean = false;

  metronomeIntervalFunction: Subscription;
  metronomeCounter: number = 0;

  metronomeSounds: HTMLAudioElement[] = [
    new Audio("assets/sounds/metronome_high.wav"),
    new Audio("assets/sounds/metronome_low.wav")
  ];

  constructor(public stateManager: StateManagerProvider) {
    this.metronomeSounds.forEach(sound => {
      sound.playbackRate = 1;
    });
  }

  startMetronome() {
    if (this.stateManager.metronomeIsActive) {
      this.metronomeIsPlaying = true;
      this.metronomeIntervalFunction = Observable.timer(
        0,
        this.stateManager.bpmObject.ms,
        Scheduler.async
      ).subscribe(this.playMetronomeAudio.bind(this));
    }
  }

  stopMetronome() {
    if (this.metronomeIntervalFunction != null) {
      this.metronomeIntervalFunction.unsubscribe();
    }
    this.metronomeCounter = 0;
  }

  private playMetronomeAudio() {
    if (
      (this.stateManager.state == "PLAYING" ||
        this.stateManager.state == "RECORDING") &&
      this.stateManager.metronomeIsActive
    ) {
      if (this.metronomeCounter % 4 == 0) {
        this.metronomeSounds[0].play();
      } else {
        this.metronomeSounds[1].play();
      }
      this.metronomeCounter++;
    }
  }

  ngOnDestroy(): void {
    if (this.metronomeIntervalFunction != null) {
      this.metronomeIntervalFunction.unsubscribe();
    }
  }
}
