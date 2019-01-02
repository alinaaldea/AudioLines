import { Component, AfterViewInit, Input } from "@angular/core";

import { File } from "@ionic-native/file";
import { Media } from "@ionic-native/media";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { TimelineProvider } from "../../providers/timeline/timeline";

declare var WaveSurfer: any;
declare var Tone: any;

/**
 * TODO: MUTE & SOLO Button-Functionality
 */
@Component({
  selector: "waves-list-item",
  templateUrl: "waves-list-item.html"
})
export class WavesListItemComponent implements AfterViewInit {
  @Input() fileName: string;
  @Input() trackID: number;
  @Input() colors: { waveColor: string; progressColor: string };

  track: { WaveSurfer: any; TonePlayer: any } = {
    WaveSurfer: "WaveSurfer", // to be replaced by the Object
    TonePlayer: "TonePlayer" // to be replaced by the Object
  };

  //WaveSurfer properties
  height: number = 98; // +2px border
  barGap: number = 1;
  barHeight: number = 3;
  barWidth: number = 2;
  interact: boolean = false;
  partialRender: boolean = false;
  responsive: boolean = true;
  cursorWidth: number = 3;
  cursorColor: string = "white";
  scrollParent: boolean = true;
  hideScrollbar: boolean = true;

  menuIsOpen: boolean = false;

  constructor(
    public stateManager: StateManagerProvider,
    public timeLine: TimelineProvider,
    public media: Media,
    public file: File
  ) {}

  ngAfterViewInit(): void {
    this.track.WaveSurfer = WaveSurfer.create({
      container: "#waveform-" + this.trackID,

      waveColor: this.colors.waveColor,
      progressColor: this.colors.progressColor,

      height: this.height,
      barGap: this.barGap,
      barHeight: this.barHeight,
      barWidth: this.barWidth,
      interact: this.interact,
      partialRender: this.partialRender,
      responsive: this.responsive,
      cursorWidth: this.cursorWidth,
      cursorColor: this.cursorColor,
      scrollParent: this.scrollParent,
      hideScrollbar: this.hideScrollbar
    });

    this.track.TonePlayer = new Tone.Player("assets/piano.mp3", () => {
      this.track.TonePlayer.sync().start(0);
      this.track.WaveSurfer.load("assets/piano.mp3");
    }).toMaster();

    this.track.WaveSurfer.on("ready", () => {
      this.track.WaveSurfer.setMute(true);
      this.stateManager.tracks[this.trackID - 1].trackData = this.track;
    });
  }

  onToggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  onMute() {}
  onSolo() {}
  onDelete() {
    /**
     * TODO: Make sure that all data belonging to the deleted track actually gets deleted
     */
    this.stateManager.tracks.forEach((track, i) => {
      if (track.id == this.trackID) {
        this.stateManager.tracks.splice(i, 1);
      }
    });
    //TODO: can be buggy in certain conditions -> trackID must be set in another way
  }
}
