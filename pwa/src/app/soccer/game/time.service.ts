import { Injectable } from '@angular/core';
import { Time } from '../models/time';

@Injectable()
export class TimeService {

  private halfTimeLengthInSeconds = 2700;

  private startFirstHalftimeTimestamp: number = null;
  private startSecondHalftimeTimestamp: number = null;

  private endFirstHalftimeTimestamp: number = null;
  private endSecondHalftimeTimestamp: number = null;

  constructor() {
  }

  public start(): void {
    if (this.startFirstHalftimeTimestamp === null) {
      this.startFirstHalftimeTimestamp = Date.now();
    } else if (this.startSecondHalftimeTimestamp === null) {
      this.startSecondHalftimeTimestamp = Date.now();
    }
  }

  public stop(): void {
    if (this.endFirstHalftimeTimestamp === null) {
      this.endFirstHalftimeTimestamp = Date.now();
    } else if (this.endSecondHalftimeTimestamp === null) {
      this.endSecondHalftimeTimestamp = Date.now();
    }
  }

  public isSecondHalf(): boolean {
    return this.endFirstHalftimeTimestamp !== null;
  }

  public getTime(): Time {

    const time = new Time();

    if (this.startSecondHalftimeTimestamp === null) {
      time.timeInSeconds = (Date.now() - this.startFirstHalftimeTimestamp) / 1000;
      time.secondHalf = false;
    } else {
      time.timeInSeconds = ((Date.now() - this.startSecondHalftimeTimestamp) / 1000) + this.halfTimeLengthInSeconds;
      time.secondHalf = true;
    }

    time.timeInSeconds = Math.floor(time.timeInSeconds);

    return time;
  }
}
