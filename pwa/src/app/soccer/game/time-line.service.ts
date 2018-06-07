import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TimeLineItem } from '../models/time-line-item';

@Injectable()
export class TimeLineService {

  private timeLineItems: TimeLineItem[];
  private timeLineSubject: Subject<TimeLineItem>;

  constructor() {
    this.timeLineItems = [];
    this.timeLineSubject = new Subject();

    this.timeLineSubject.subscribe((timeLineItem: TimeLineItem) => {
      this.timeLineItems.push(timeLineItem);
    });
  }

  public setItems(items: TimeLineItem[]): void {
    this.timeLineItems = items;
  }

  public getSubject(): Subject<TimeLineItem> {
    return this.timeLineSubject;
  }


}
