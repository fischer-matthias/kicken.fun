import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StopWatchService {

  private timeInSeconds = 0;
  private subject;

  private runFlag = false;

  constructor() {
    this.subject = new Subject<Number>();
  }

  public getObservable(): Subject<Number> {
    return this.subject;
  }

  public startTimer(): void {

    if (!this.runFlag) {
      this.runFlag = true;
      this.countSecond();
    }
  }

  public stopTimer(): void {
    this.runFlag = false;
  }

  private countSecond(): void {
    setTimeout(() => {
      this.timeInSeconds += 1;
      this.subject.next(this.timeInSeconds);

      if (this.runFlag) {
        this.countSecond();
      }
    }, 1000);
  }
}
