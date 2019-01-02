import { Injectable } from "@angular/core";

import { StateManagerProvider } from "../state-manager/state-manager";

declare var Tone: any;

/*
  Generated class for the MetronomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MetronomeProvider {
  isPlaying: boolean = false;

  metronomeSound: any;
  metronomeLoop: any;

  constructor(public stateManager: StateManagerProvider) {}

  startMetronome() {
    if (this.metronomeSound == undefined) {
      this.metronomeSound = new Tone.PolySynth().toMaster();
    }
    if (
      this.stateManager.metronomeIsActive &&
      (this.stateManager.state == "PLAYING" ||
        this.stateManager.state == "RECORDING")
    ) {
      Tone.Transport.bpm.value = this.stateManager.bpmObject.bpm;
      Tone.Transport.start("+0.1");

      this.metronomeLoop = new Tone.Loop(time => {
        this.metronomeSound.triggerAttackRelease("C6", "32n", time);
      }, "4n").start(0);
    }
  }

  stopMetronome() {
    if (this.metronomeLoop != undefined) {
      this.metronomeLoop.stop();
    }
  }
}
