import { Component, AfterViewInit, Input } from "@angular/core";

import { File } from "@ionic-native/file";
import { Media } from "@ionic-native/media";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { TimelineProvider } from "../../providers/timeline/timeline";

declare var WaveSurfer: any;
declare var Tone: any;

/**
 * TODO: MUTE & SOLO Button-Functionality
 * TODO: WAVESURFER Multicoloring
 */
@Component({
  selector: "waves-list-item",
  templateUrl: "waves-list-item.html"
})
export class WavesListItemComponent implements AfterViewInit {
  @Input() fileName: string;
  @Input() trackID: number;
  track: { WaveSurfer: any; TonePlayer: any };

  //WaveSurfer properties
  height: number = 98; // +2px border
  barGap: number = 1;
  barHeight: number = 2;
  barWidth: number = 2;
  fillParent: boolean = true;
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

      waveColor: "red",
      progressColor: "orange",

      height: this.height,
      barGap: this.barGap,
      barHeight: this.barHeight,
      barWidth: this.barWidth,
      fillParent: this.fillParent,
      interact: this.interact,
      partialRender: this.partialRender,
      responsive: this.responsive,
      cursorWidth: this.cursorWidth,
      cursorColor: this.cursorColor,
      scrollParent: this.scrollParent,
      hideScrollbar: this.hideScrollbar
    });

    this.file
      .readAsDataURL(
        this.file.externalApplicationStorageDirectory + "/files",
        this.fileName
      )
      .then((url: string) => {
        this.track.TonePlayer = new Tone.Player(url, () => {
          this.track.TonePlayer.sync().start(0);
          this.track.WaveSurfer.load(url);
        }).toMaster();
      })
      .catch(e => {
        alert(e.message);
        console.log(e);
      });

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
    console.log(this.stateManager.showStateManagerAsObject());
  }
}
