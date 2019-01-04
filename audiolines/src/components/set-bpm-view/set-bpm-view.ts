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
    this.stateManager.bpmObject.bpm = event.target.valueAsNumber;
    this.stateManager.bpmObject.ms = this.bpm.calc(
      this.stateManager.bpmObject.bpm
    );
    console.log(this.stateManager.bpmObject);
  }

  onIncreaseBPM() {
    this.stateManager.bpmObject.bpm++;
    this.stateManager.bpmObject.ms = this.bpm.calc(
      this.stateManager.bpmObject.bpm
    );
    console.log(this.stateManager.bpmObject);
  }

  onDecreaseBPM() {
    this.stateManager.bpmObject.bpm--;
    this.stateManager.bpmObject.ms = this.bpm.calc(
      this.stateManager.bpmObject.bpm
    );
    console.log(this.stateManager.bpmObject);
  }
}
