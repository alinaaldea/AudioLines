import { Component, AfterViewInit, Input } from "@angular/core";

import { File } from "@ionic-native/file";
import { Media } from "@ionic-native/media";
import { ToastController } from "ionic-angular";

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
  //-----

  private menuIsOpen: boolean = false;

  constructor(
    public stateManager: StateManagerProvider,
    public timeLine: TimelineProvider,
    private toastCtrl: ToastController,
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

    // +++++ONLY FOR TEST+++++
    // this.track.TonePlayer = new Tone.Player("assets/piano.mp3", () => {
    //   this.track.TonePlayer.sync().start(0);
    //   this.track.WaveSurfer.load("assets/piano.mp3");
    // }).toMaster();
    // +++++++++++++++++++++++

    this.file
      .readAsDataURL(this.file.externalDataDirectory, this.fileName)
      .then((url: string) => {
        this.track.TonePlayer = new Tone.Player(url, () => {
          this.track.TonePlayer.sync().start(0);
          this.track.WaveSurfer.load(url);
        }).toMaster();
      })
      .catch(e => {
        //alert(e.message);
        this.presentToast("No rights to record were given!");
        console.log(e);
      });

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

  //TODO: MUTE AND SOLO NEED TO BE REWORKED -> STATEMANAGEMENT SHOULD BE OUTSIDE

  onMute() {
    this.stateManager.tracks.forEach((track, i) => {
      if (track.id == this.trackID) {
        console.log(
          "The state of Track: " +
            this.stateManager.tracks[i].id +
            " is " +
            this.stateManager.tracks[i].state
        );
        if (this.stateManager.tracks[i].state == "ACTIVE") {
          this.stateManager.tracks[i].trackData.TonePlayer.mute = true;
          this.stateManager.tracks[i].state = "TRACK_MUTE";

          //TODO: WaveSurfer somehow bugs a bit after changing the color of the tracks
          track.trackData.WaveSurfer.setWaveColor("#C0C0C0"); //somehow get trkDisabled variable
          track.trackData.WaveSurfer.setProgressColor("#C0C0C0");

          console.log(
            "Update The state of Track: " +
              this.stateManager.tracks[i].id +
              " to " +
              this.stateManager.tracks[i].state
          );

          this.onToggleMenu();
        } else if (this.stateManager.tracks[i].state == "TRACK_MUTE") {
          var isSolo = false;
          this.stateManager.tracks.forEach(track => {
            if (track.state == "TRACK_SOLO") {
              isSolo = true;
            }
          });
          if (!isSolo) {
            this.stateManager.tracks[i].trackData.TonePlayer.mute = false;
            this.stateManager.tracks[i].state = "ACTIVE";

            track.trackData.WaveSurfer.setWaveColor(this.colors.waveColor);
            track.trackData.WaveSurfer.setProgressColor(
              this.colors.progressColor
            );

            console.log(
              "Update The state of Track: " +
                this.stateManager.tracks[i].id +
                " to " +
                this.stateManager.tracks[i].state
            );

            this.onToggleMenu();
          }
        }
      }
    });
  }

  onSolo() {
    this.stateManager.tracks.forEach((track, i) => {
      if (track.id != this.trackID) {
        if (this.stateManager.tracks[i].state == "ACTIVE") {
          this.stateManager.tracks[i].trackData.TonePlayer.mute = true;
          this.stateManager.tracks[i].state = "TRACK_MUTE";

          console.log(
            "Mute because solo Track: " +
              this.stateManager.tracks[i].id +
              " to " +
              this.stateManager.tracks[i].state
          );
        } else if (this.stateManager.tracks[i].state == "TRACK_MUTE") {
          var isSolo;
          this.stateManager.tracks.forEach(track => {
            if (track.state == "TRACK_SOLO") {
              isSolo = true;
            }
          });
          if (!isSolo) {
            this.stateManager.tracks[i].trackData.TonePlayer.mute = false;
            this.stateManager.tracks[i].state = "ACTIVE";

            console.log(
              "unMute because solo Track: " +
                this.stateManager.tracks[i].id +
                " to " +
                this.stateManager.tracks[i].state
            );
          }
        }
      } else if (track.id == this.trackID) {
        if (
          this.stateManager.tracks[i].state == "ACTIVE" ||
          this.stateManager.tracks[i].state == "TRACK_MUTE"
        ) {
          this.stateManager.tracks[i].state = "TRACK_SOLO";
          this.stateManager.tracks[i].trackData.TonePlayer.mute = false;

          console.log(
            "enable solo " +
              this.stateManager.tracks[i].id +
              " to " +
              this.stateManager.tracks[i].state
          );
        } else if (
          this.stateManager.tracks[i].state == "TRACK_SOLO" ||
          this.stateManager.tracks[i].state == "TRACK_MUTE"
        ) {
          var otherSolo;
          this.stateManager.tracks.forEach(track => {
            if (track.state == "TRACK_SOLO" && track.id != this.trackID) {
              otherSolo = true;
            }
          });
          if (otherSolo) {
            this.stateManager.tracks[i].state = "TRACK_MUTE";
            this.stateManager.tracks[i].trackData.TonePlayer.mute = true;

            console.log(
              "Track " +
                this.stateManager.tracks[i].id +
                "becaus another track is on Solo"
            );
          } else {
            this.stateManager.tracks[i].state = "ACTIVE";
            this.stateManager.tracks[i].trackData.TonePlayer.mute = false;

            console.log(
              "disable Solo " +
                this.stateManager.tracks[i].id +
                " to " +
                this.stateManager.tracks[i].state
            );
          }
        }
      }
    });
  }

  onDelete() {
    this.stateManager.tracks.forEach((track, i) => {
      if (track.id == this.trackID) {
        //Remove Track completely
        this.track.TonePlayer.dispose();
        this.file.removeFile(this.file.externalDataDirectory, track.fileName);
        //Remove File from tracks
        this.stateManager.tracks.splice(i, 1);
      }
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });
    toast.present();
  }

  disableTrack() {
    return (
      this.stateManager.tracks[this.positionOfTrackID(this.trackID)].state ==
      "TRACK_MUTE"
    );
  }
}
