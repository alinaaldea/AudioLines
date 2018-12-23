import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
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
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  ionViewWillEnter() {
    this.getAudioList();
  }

  constructor(
    public navCtrl: NavController,
    private media: Media,
    private file: File
  ) {}

  startRecord() {
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
      this.file.externalDataDirectory.replace(/file:\/\//g, "") + this.fileName;
    this.audio = this.media.create(this.filePath);

    this.audio.startRecord();

    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    sessionStorage.setItem("audiolist", JSON.stringify(this.audioList));

    this.recording = false;
    this.getAudioList();
    this.playAudio(this.fileName, 0);
  }

  // wird ersetzt durch wavesurfer
  playAudio(file, idx) {
    this.filePath =
      this.file.externalDataDirectory.replace(/file:\/\//g, "") + file;
    this.audio = this.media.create(this.filePath);

    this.audio.play();
    this.audio.setVolume(1);
  }

  getAudioList() {
    if (sessionStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(sessionStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }
}
