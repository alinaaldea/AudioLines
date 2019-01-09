import { Injectable } from "@angular/core";

import { StateManagerProvider } from "../state-manager/state-manager";

declare var Tone: any;

@Injectable()
export class MetronomeProvider {
  metronomeSound: any;
  metronomeLoop: any;

  constructor(public stateManager: StateManagerProvider) {}

  startMetronome() {
    if (this.metronomeSound == undefined) {
      this.metronomeSound = new Tone.PolySynth().toMaster();
    }
    if (this.stateManager.metronomeIsActive) {
      this.metronomeLoop = Tone.Transport.scheduleRepeat(time => {
        this.triggerSynth(time);
        console.log(Tone.Transport.getSecondsAtTime());
      }, "4n");
    }
  }

  stopMetronome() {
    Tone.Transport.clear(this.metronomeLoop);
  }

  triggerSynth(time) {
    this.metronomeSound.triggerAttackRelease("C6", "64n", time);
  }
}
