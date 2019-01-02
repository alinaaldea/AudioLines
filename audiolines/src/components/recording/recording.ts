import { Component } from "@angular/core";

import { Media, MediaObject } from "@ionic-native/media";
import { File } from "@ionic-native/file";

import {
  StateManagerProvider,
  track
} from "../../providers/state-manager/state-manager";
import { TimelineProvider } from "../../providers/timeline/timeline";

/**
 * TODO: if Metronome is active ->
 * count 1 measure (4 BEATS) before the app starts recording
 *
 * right now that leads to a UX problem:
 * -> if the user starts to play without having recorded anything
 * the record-button gets greyed out.
 * this should not be happening until the user has recorded at least 1 track
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
    public timeLine: TimelineProvider,
    public media: Media,
    public file: File
  ) {}

  startRecord() {
    if (this.stateManager.state == "STOPPED") {
      this.stateManager.state = "RECORDING";

      this.fileName =
        "record" +
        new Date().getDate() +
        new Date().getMonth() +
        new Date().getFullYear() +
        new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        ".mp3";
      this.filePath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") +
        this.fileName;
      this.audio = this.media.create(this.filePath);
      this.timeLine.start();
      this.audio.startRecord();
    }
  }

  stopRecord() {
    if (this.stateManager.state == "RECORDING") {
      this.stateManager.state = "STOPPED";
      this.audio.stopRecord();
      this.audio.release();
      this.timeLine.stop();
      this.createTrack(this.fileName, this.stateManager.tracks.length + 1); //trackID starts at 1
    }
  }

  createTrack(file, idx) {
    let track: track = {
      id: idx,
      fileName: file,
      state: "ACTIVE" //possible states: "ACTIVE","TRACK_MUTE" or "TRACK_SOLO"
    };
    this.stateManager.tracks.push(track);
    console.log(this.stateManager.showStateManagerAsObject());
  }
}
