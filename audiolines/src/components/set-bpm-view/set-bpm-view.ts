import { Component } from "@angular/core";

import { StateManagerProvider } from "../../providers/state-manager/state-manager";
import { BpmProvider } from "../../providers/bpm/bpm";

@Component({
  selector: "set-bpm-view",
  templateUrl: "set-bpm-view.html"
})
export class SetBpmViewComponent {
  bpmObject: { bpm: number; ms: number } = this.stateManager.bpmObject;

  constructor(
    public stateManager: StateManagerProvider,
    private bpm: BpmProvider
  ) {}

  onTap() {
    this.stateManager.bpmObject = this.bpm.tap();
  }

  onTypeIn(event: any) {
    this.bpmObject.bpm = event.target.valueAsNumber;
    this.bpmObject.ms = this.bpm.calc(this.bpmObject.bpm);
    console.log(this.bpmObject);
    this.stateManager.bpmObject = this.bpmObject;
  }

  onIncreaseBPM() {
    this.bpmObject.bpm++;
    this.bpmObject.ms = this.bpm.calc(this.bpmObject.bpm);
    console.log(this.bpmObject);
  }

  onDecreaseBPM() {
    this.bpmObject.bpm--;
    this.bpmObject.ms = this.bpm.calc(this.bpmObject.bpm);
    console.log(this.bpmObject);
  }
}
