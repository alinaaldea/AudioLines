import { Component } from "@angular/core";

/**
 * Class for the RecordingComponent.
 *
 */
@Component({
  selector: "recording",
  templateUrl: "recording.html"
})
export class RecordingComponent {
  // !!!! implemented in branch "recording-functionality" !!!
  // you can use this class to simulate the recording
  // and then reading the files to implement the wave thing

  recording: boolean = false;

  startRecord() {
    alert("Would be recording now!");
    this.recording = true;
  }

  stopRecord() {
    this.recording = false;
  }
}
