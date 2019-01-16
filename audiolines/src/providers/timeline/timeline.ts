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
    let delay=0;
    Tone.Transport.bpm.value = this.stateManager.bpmObject.bpm;
    this.metronome.startMetronome();

    if (this.stateManager.state == "RECORDING" && this.stateManager.metronomeIsActive) {
      delay = Tone.TransportTime("1:0:0").toMilliseconds();
      this.stateManager.tracks.forEach(track => {
        track.trackData.TonePlayer.stop()
          .start(Tone.TransportTime("1:0:0").valueOf())
          .sync();
      });
    }

    if (this.stateManager.state == "PLAYING" ||
        this.stateManager.state == "RECORDING" && !this.stateManager.metronomeIsActive){
          this.stateManager.tracks.forEach(track => {
            track.trackData.TonePlayer.stop()
            .start()
            .sync();
          });
    }


    Tone.Transport.start();
    this.stateManager.tracks.forEach(track => {
      if (track.trackData != undefined) {
        track.trackData.TonePlayer.loop = true;
        track.trackData.WaveSurfer.play();
      }
        setTimeout( () => {
          this.visualizationStart(track);
        }, delay);
    });
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
    this.metronome.stopMetronome();
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

  visualizationStart(track: any) {
    if (track.trackData != undefined) {
      track.trackData.WaveSurfer.play();
    }
  }
}
