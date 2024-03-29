import { Injectable } from "@angular/core";

@Injectable()
export class StateManagerProvider {
  state: string = "STOPPED"; // possible States: "STOPPED","PAUSED","PLAYING","RECORDING","EXPORT","BPM"
  metronomeIsActive: boolean = false; //standard set to OFF
  bpmObject: { bpm: number; ms: number } = {
    bpm: 100, //standard BPM set to 100
    ms: 600 //600 ms == 100 BPM
  };

  tracks: track[] = [];

  showStateManagerAsObject(): {
    state: string;
    metronomeIsActive: boolean;
    bpmObject: { bpm: number; ms: number };
    tracks: track[];
  } {
    let state = this.state;
    let metronomeIsActive = this.metronomeIsActive;
    let bpmObject = this.bpmObject;
    let tracks = this.tracks;

    return {
      state,
      metronomeIsActive,
      bpmObject,
      tracks
    };
  }
}

export interface track {
  id: number;
  fileName: string;
  state: string; //possible states: "ACTIVE","TRACK_MUTE" or "TRACK_SOLO"
  trackData?: any;
}
