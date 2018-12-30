import { Component, AfterViewInit, Input } from "@angular/core";
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
export class WavesListItemComponent implements AfterViewInit {
  @Input() pathToRecording: string;
  @Input() trackID: number;
  track: any;

  //WaveSurfer properties
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

  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider
  ) {}

  ngAfterViewInit(): void {
    this.track = WaveSurfer.create({
      container: "#waveform-" + this.trackID,

      waveColor: "red",
      progressColor: "orange",

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
    });
    this.track.load(this.pathToRecording); // must be changed later
    // this.track.on("ready", () => {
    //   console.log("TEST");
    // });
  }

  onClick() {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
