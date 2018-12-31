import { Injectable } from "@angular/core";

/*
  Generated class for the BpmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BpmProvider {
  count: number = 0;
  timeStamp: number = 0;
  oldTimeStamp: number = 0;
  firstTimeStamp: number;

  tap(): { bpm: number; ms: number } {
    this.timeStamp = Date.now();
    if (!this.firstTimeStamp) this.firstTimeStamp = this.timeStamp;

    let ret = { bpm: 0, ms: 0 };

    //ignore first tap
    if (this.oldTimeStamp) {
      let ms: number = this.timeStamp - this.oldTimeStamp;
      let bpm = Math.round(60000 / ms);
      // Math.floor((60000 * this.count) / (this.timeStamp - this.firstTimeStamp))

      console.log(bpm + "bpm" + " / " + ms + "ms");
      ret.bpm = bpm;
      ret.ms = ms;
    }

    this.count++;

    if (ret.ms >= 2000) {
      // 2000ms == 30Bpm
      // -> after 2000ms the counter starts from the beginning
      this.reset();
      return { bpm: 0, ms: 0 };
    }

    //store the old timestamp
    this.oldTimeStamp = this.timeStamp;
    return ret;
  }

  calc(ms?: number, bpm?: number): number {
    if (ms != undefined) {
      return Math.round(60000 / ms); // returns bpm
    }
    if (bpm != undefined) {
      return 60000 / bpm; //returns ms
    }
  }

  reset() {
    this.count = 0;
    this.timeStamp = 0;
    this.oldTimeStamp = 0;
    this.firstTimeStamp = 0;
  }
}
