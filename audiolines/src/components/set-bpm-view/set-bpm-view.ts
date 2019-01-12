import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { BpmProvider } from "../../providers/bpm/bpm";

@Component({
  selector: "set-bpm-view",
  templateUrl: "set-bpm-view.html"
})
export class SetBpmViewComponent {
  constructor(
    public stateManager: StateManagerProvider,
    private bpm: BpmProvider
  ) {}

  onTap() {
    this.stateManager.bpmObject = this.bpm.tap();
  }

  onTypeIn(event: any) {
    console.log(event.target.valueAsNumber);
    if (event.target.valueAsNumber >= 300) {
      this.stateManager.bpmObject.bpm = 300;
      this.stateManager.bpmObject.ms = this.bpm.calc(
        this.stateManager.bpmObject.bpm
      );
    } else if (event.target.valueAsNumber <= 30) {
      this.stateManager.bpmObject.bpm = 30;
      this.stateManager.bpmObject.ms = this.bpm.calc(
        this.stateManager.bpmObject.bpm
      );
    } else {
      this.stateManager.bpmObject.bpm = event.target.valueAsNumber;
      this.stateManager.bpmObject.ms = this.bpm.calc(
        this.stateManager.bpmObject.bpm
      );
    }
    console.log(this.stateManager.bpmObject);
  }

  onIncreaseBPM() {
    if (this.stateManager.bpmObject.bpm < 300) {
      this.stateManager.bpmObject.bpm++;
      this.stateManager.bpmObject.ms = this.bpm.calc(
        this.stateManager.bpmObject.bpm
      );
      console.log(this.stateManager.bpmObject);
    }
  }

  onDecreaseBPM() {
    if (this.stateManager.bpmObject.bpm > 30) {
      this.stateManager.bpmObject.bpm--;
      this.stateManager.bpmObject.ms = this.bpm.calc(
        this.stateManager.bpmObject.bpm
      );
      console.log(this.stateManager.bpmObject);
    }
  }
}
