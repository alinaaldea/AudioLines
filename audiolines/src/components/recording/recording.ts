import { Component } from "@angular/core";
import {
  StateManagerProvider,
  track
} from "../../providers/state-manager/state-manager";
import { Media, MediaObject } from "@ionic-native/media";
import { File } from "@ionic-native/file";
import { MetronomeProvider } from "../../providers/metronome/metronome";

/**
 * Class for the RecordingComponent.
 *
 */
@Component({
  selector: "recording",
  templateUrl: "recording.html"
})
export class RecordingComponent {
  filePath: string;
  fileName: string;
  audio: MediaObject;

  constructor(
    public stateManager: StateManagerProvider,
    public metronome: MetronomeProvider,
    public media: Media,
    public file: File
  ) {}

  startRecord() {
    if (this.stateManager.state == "IDLE") {
      this.stateManager.state = "RECORDING";
      this.fileName =
        "record" +
        new Date().getDate() +
        new Date().getMonth() +
        new Date().getFullYear() +
        new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        ".mp3"; //.mp3
      this.filePath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") +
        this.fileName;
      this.audio = this.media.create(this.filePath);
      this.stateManager.tracks.forEach(track => {
        if (track.trackData != null) {
          track.trackData.setVolume(1);
          track.trackData.play();
        }
      });
      this.metronome.startMetronome(); // counter first
      this.audio.startRecord();
    }
  }

  stopRecord() {
    if (this.stateManager.state == "RECORDING") {
      this.stateManager.state = "IDLE";
      this.audio.stopRecord();
      this.audio.release();
      this.metronome.stopMetronome();
      this.createTrack(this.fileName, this.stateManager.tracks.length + 1); //trackID starts at 1
    }
  }

  createTrack(file, idx) {
    let track: track = {
      id: idx,
      fileName: this.fileName,
      state: "ACTIVE" //possible states: "ACTIVE","TRACK_MUTE" or "TRACK_SOLO"
    };
    this.stateManager.tracks.push(track);
  }
}
