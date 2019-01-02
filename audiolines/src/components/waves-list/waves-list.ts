import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "waves-list",
  templateUrl: "waves-list.html"
})
export class WavesListComponent {
  waveTrackColors: { waveColor: string; progressColor: string }[] = [
    { waveColor: "#EB0202", progressColor: "#690000" }, //red-ish
    { waveColor: "#48CC01", progressColor: "#205C00" }, //green-ish
    { waveColor: "#0D4F99", progressColor: "#052345" }, // blue-ish
    { waveColor: "pink", progressColor: "purple" },
    { waveColor: "#EBAC02", progressColor: "#694D00" } // yellow-ish
  ];

  constructor(public stateManager: StateManagerProvider) {}

  getNextColor(): { waveColor: string; progressColor: string } {
    /**
     * TODO: ARRAY-BUG
     * somehow loops through all the elements
     * when it should just take the first one and push it last
     */
    let color = this.waveTrackColors.shift();
    console.log(color);
    this.waveTrackColors.push(color);
    return color;
  }
}
