import { Component } from "@angular/core";
import {
  StateManagerProvider,
  track
} from "../../providers/state-manager/state-manager";
import { Media, MediaObject } from "@ionic-native/media";
import { File } from "@ionic-native/file";

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
  // audioList: any[] = [];

  constructor(
    public stateManager: StateManagerProvider,
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
        ".mp3"; //.3gp
      this.filePath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") +
        this.fileName;
      this.audio = this.media.create(this.filePath);

      this.audio.startRecord();
    }
  }

  stopRecord() {
    if (this.stateManager.state == "RECORDING") {
      this.stateManager.state = "IDLE";
      this.audio.stopRecord();
      this.createTrack(this.fileName, this.stateManager.tracks.length + 1); //trackID starts at 1
    }
  }

  createTrack(file, idx) {
    let track: track = {
      id: idx,
      fileName: this.fileName,
      state: "ACTIVE" //possible states: "ACTIVE","TRACK_MUTE" or "TRACK_SOLO"
    };
    alert(this.fileName);
    this.stateManager.tracks.push(track);
  }
}
