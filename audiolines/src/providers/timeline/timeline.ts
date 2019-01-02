import { Injectable } from "@angular/core";

import { StateManagerProvider } from "../state-manager/state-manager";
import { BpmProvider } from "../bpm/bpm";
import { MetronomeProvider } from "../metronome/metronome";

declare var Tone: any;

@Injectable()
export class TimelineProvider {
  constructor(
    public stateManager: StateManagerProvider,
    public bpm: BpmProvider,
    public metronome: MetronomeProvider
  ) {
    Tone.Transport.bpm.value = this.stateManager.bpmObject.bpm;
    console.log(Tone.Transport);
  }

  start() {
    Tone.Transport.bpm.value = this.stateManager.bpmObject.bpm;

    this.metronome.startMetronome();

    Tone.Transport.start();
    console.log(Tone.Transport.state);
  }

  pause() {
    this.metronome.stopMetronome();

    Tone.Transport.pause();
    console.log(Tone.Transport.state);
  }

  stop() {
    Tone.Transport.stop();
    console.log(Tone.Transport.state);
  }

  getTimeline() {
    return Tone.Transport;
  }
}
