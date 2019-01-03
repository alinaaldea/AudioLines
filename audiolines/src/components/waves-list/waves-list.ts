import { Component, AfterViewChecked } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";

@Component({
  selector: "waves-list",
  templateUrl: "waves-list.html"
})
export class WavesListComponent implements AfterViewChecked {
  waveTrackColors: { waveColor: string; progressColor: string }[] = [
    { waveColor: "#EB0202", progressColor: "#690000" }, // red-ish
    { waveColor: "#48CC01", progressColor: "#205C00" }, // green-ish
    { waveColor: "#0D4F99", progressColor: "#052345" }, // blue-ish
    { waveColor: "pink", progressColor: "purple" },
    { waveColor: "#EBAC02", progressColor: "#694D00" } // yellow-ish
  ];

  nextColor: { waveColor: string; progressColor: string };

  ngAfterViewChecked(): void {
    this.nextColor = this.getNextColor();
  }

  constructor(public stateManager: StateManagerProvider) {}

  getNextColor(): { waveColor: string; progressColor: string } {
    let color = this.waveTrackColors.shift();
    this.waveTrackColors.push(color);
    return color;
  }
}
