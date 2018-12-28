import { Injectable } from "@angular/core";

/*
  Generated class for the StateManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StateManagerProvider {
  state: string = "IDLE"; // possible States: "IDLE","PLAYING","RECORDING","EXPORT","BPM"

  projectBPM: number = 100; //standard BPM set to 100

  //track properties should be in here too so the export module and
  //the solo/mute/delete functions can be global
}
