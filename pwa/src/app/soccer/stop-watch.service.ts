import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TimePipe } from './time.pipe';

@Injectable()
export class StopWatchService {

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
    return this.startSecondHalftimeTimestamp !== null;
  }

  public getTimeInSeconds(): number {

    let timeInSeconds: number;

    if (this.startSecondHalftimeTimestamp === null) {
      timeInSeconds = (Date.now() - this.startFirstHalftimeTimestamp) / 1000;
    } else {
      timeInSeconds = ((Date.now() - this.startSecondHalftimeTimestamp) / 1000) + this.halfTimeLengthInSeconds;
    }

    return Math.floor(timeInSeconds);
  }
}
