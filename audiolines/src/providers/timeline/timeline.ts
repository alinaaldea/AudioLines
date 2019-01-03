import { Injectable } from "@angular/core";

import { StateManagerProvider } from "../state-manager/state-manager";
import { MetronomeProvider } from "../metronome/metronome";

declare var Tone: any;

@Injectable()
export class TimelineProvider {
  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider
  ) {
    Tone.Transport.bpm.value = this.stateManager.bpmObject.bpm;
    // console.log(Tone.Transport);
  }

  start() {
    Tone.Transport.bpm.value = this.stateManager.bpmObject.bpm;

    this.metronome.startMetronome();
    this.stateManager.tracks.forEach(track => {
      if (track.trackData != undefined) {
        track.trackData.WaveSurfer.play();
      }
    });
    Tone.Transport.start();
    console.log(Tone.Transport.state);
  }

  pause() {
    this.metronome.stopMetronome();
    this.stateManager.tracks.forEach(track => {
      if (track.trackData != undefined) {
        track.trackData.WaveSurfer.pause();
      }
    });
    Tone.Transport.pause();
    console.log(Tone.Transport.state);
  }

  stop() {
    this.stateManager.tracks.forEach(track => {
      if (track.trackData != undefined) {
        track.trackData.WaveSurfer.stop();
      }
    });
    Tone.Transport.stop();
    console.log(Tone.Transport.state);
  }

  getTimeline() {
    return Tone.Transport;
  }
}
