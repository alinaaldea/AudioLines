import { Component } from "@angular/core";
import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { MetronomeProvider } from "../../providers/metronome/metronome";

declare var WaveSurfer: any;
/**
 * Generated class for the WavesListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "waves-list-item",
  templateUrl: "waves-list-item.html"
})
export class WavesListItemComponent {
  tracks: any[] = [];

  height: number = 98; // +2px border
  barGap: number = 1;
  barHeight: number = 1;
  barWidth: number = 2;
  normalize: boolean = true;
  interact: boolean = false;
  partialRender: boolean = true;
  responsive: boolean = true;
  cursorWidth: number = 3;
  cursorColor: string = "white";
  scrollParent: boolean = true;
  hideScrollbar: boolean = true;

  menuIsOpen: boolean = false;

  ngAfterViewInit(): void {
    this.tracks.push(
      // array must be in waves-list
      WaveSurfer.create({
        container: "#waveform-1",

        waveColor: "violet",
        progressColor: "purple",

        height: this.height,
        barGap: this.barGap,
        barHeight: this.barHeight,
        barWidth: this.barWidth,
        normalize: this.normalize,
        interact: this.interact,
        partialRender: this.partialRender,
        responsive: this.responsive,
        cursorWidth: this.cursorWidth,
        cursorColor: this.cursorColor,
        scrollParent: this.scrollParent,
        hideScrollbar: this.hideScrollbar
      })
    );
    this.tracks[0].load("assets/piano.mp3"); // must be changed later
  }

  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider
  ) {}

  onClick() {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
