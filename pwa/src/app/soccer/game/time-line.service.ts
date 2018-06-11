import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TimeLineItem } from '../models/time-line-item';

@Injectable()
export class TimeLineService {

  private timeLineItems: TimeLineItem[];
  private timeLineSubject: Subject<TimeLineItem>;

  constructor() {
    this.clear();
    this.timeLineSubject = new Subject();

    this.timeLineSubject.subscribe((timeLineItem: TimeLineItem) => {
      this.timeLineItems.push(timeLineItem);
    });
  }

  public clear(): void {
    this.timeLineItems = [];
  }

  public setItems(items: TimeLineItem[]): void {
    this.floodTimeLine(items);
  }

  public getItems(): TimeLineItem[] {
    return this.timeLineItems;
  }

  public getSubject(): Subject<TimeLineItem> {
    return this.timeLineSubject;
  }

  private floodTimeLine(items: TimeLineItem[]): void {
    items.forEach((timeLineItem: TimeLineItem) => {
      this.timeLineSubject.next(timeLineItem);
    });
  }

}
