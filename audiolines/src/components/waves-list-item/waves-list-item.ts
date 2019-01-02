import { Component, AfterViewInit, Input } from "@angular/core";

import { File } from "@ionic-native/file";
import { Media } from "@ionic-native/media";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { MetronomeProvider } from "../../providers/metronome/metronome";
import { TimelineProvider } from "../../providers/timeline/timeline";

declare var WaveSurfer: any;
declare var Tone: any;
@Component({
  selector: "waves-list-item",
  templateUrl: "waves-list-item.html"
})
export class WavesListItemComponent implements AfterViewInit {
  @Input() fileName: string;
  @Input() trackID: number;
  track: any; // {WaveSurfer:any, TonePlayer:any}

  //WaveSurfer properties
  height: number = 98; // +2px border
  barGap: number = 1;
  barHeight: number = 2;
  barWidth: number = 2;
  normalize: boolean = true;
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
    public metronome: MetronomeProvider,
    public timeLine: TimelineProvider,
    public media: Media,
    public file: File
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

    this.file
      .readAsDataURL(
        this.file.externalApplicationStorageDirectory + "/files",
        this.fileName
      )
      .then((url: string) => {
        let player = new Tone.Player(url, () => {
          player.sync().start(0);
          this.track.load(url);
        }).toMaster();
      })
      .catch(e => {
        alert(e.message);
        console.log(e);
      });

    this.track.on("ready", () => {
      this.track.setMute(true);
      this.stateManager.tracks[this.trackID - 1].trackData = this.track;
    });
  }

  onToggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  onMute() {}
  onSolo() {}
  onDelete() {
    this.stateManager.tracks.forEach((track, i) => {
      if (track.id == this.trackID) {
        this.stateManager.tracks.splice(i, 1);
      }
    });
    //can be buggy in certain conditions -> trackID must be set in another way
    console.log(this.stateManager.showStateManagerAsObject());
  }
}
