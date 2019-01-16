import { Component, AfterViewInit, Input, state } from "@angular/core";

import { File } from "@ionic-native/file";
import { Media } from "@ionic-native/media";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { TimelineProvider } from "../../providers/timeline/timeline";

declare var WaveSurfer: any;
declare var Tone: any;

/**
 * TODO: MUTE & SOLO Button-Functionality (REQUIRED) -> Philipp K.
 */

@Component({
  selector: "waves-list-item",
  templateUrl: "waves-list-item.html"
})
export class WavesListItemComponent implements AfterViewInit {
  @Input() fileName: string;
  @Input() trackID: number;
  @Input() colors: { waveColor: string; progressColor: string };
  @Input() frontendID: number;

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

    this.track.TonePlayer = new Tone.Player("assets/beat.mp3", () => {
      this.track.TonePlayer.sync().start(0);
      this.track.WaveSurfer.load("assets/beat.mp3");
    }).toMaster();

    this.track.WaveSurfer.on("ready", () => {
      this.track.WaveSurfer.setMute(true);
      console.log("my track ID = " + this.trackID);
      this.stateManager.tracks[
        this.positionOfTrackID(this.trackID)
      ].trackData = this.track;
    });

    //Used for looping, once it's finished it will loop again
    this.track.WaveSurfer.on("finish", () => {
      this.track.WaveSurfer.play();
    });
  }

  positionOfTrackID(trackID): number {
    for (var i = 0; i < this.stateManager.tracks.length; i++) {
      if (trackID === this.stateManager.tracks[i].id) return i;
    }
  }

  onToggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  onMute() {}
  onSolo() {}
  onDelete() {
    this.stateManager.tracks.forEach((track, i) => {
      if (track.id == this.trackID) {
        //Remove Track completely
        this.track.TonePlayer.dispose();
        //Remove File from tracks
        this.stateManager.tracks.splice(i, 1);
      }
    });
  }
}
