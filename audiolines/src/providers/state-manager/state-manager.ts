import { Injectable } from "@angular/core";

/*
  Generated class for the StateManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StateManagerProvider {
  state: string = "IDLE"; // possible States: "IDLE","PLAYING","RECORDING","EXPORT","BPM"
  metronomeIsActive: boolean = false; //standard set to OFF
  bpmObject: { avg: number; count: number; ms: number } = {
    avg: 100, //standard BPM set to 100
    ms: 600, //600 ms == 100 BPM
    count: 0
  };

  tracks: track[] = [];

  showStateManagerAsObject(): {
    state: string;
    metronomeIsActive: boolean;
    bpmObject: { avg: number; count: number; ms: number };
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
