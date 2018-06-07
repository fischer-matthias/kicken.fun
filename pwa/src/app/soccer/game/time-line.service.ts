import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TimeLineItem } from '../models/time-line-item';

@Injectable()
export class TimeLineService {

  private timeLineItems: TimeLineItem[];
  private timeLineSubject: Subject<TimeLineItem>;

  constructor() {
    this.clear();
  }

  public clear(): void {
    this.timeLineItems = [];
    this.timeLineSubject = new Subject();

    this.timeLineSubject.subscribe((timeLineItem: TimeLineItem) => {
      this.timeLineItems.push(timeLineItem);
    });
  }

  public setItems(items: TimeLineItem[]): void {
    this.timeLineItems = items;
    this.floodTimeLine();
  }

  public getItems(): TimeLineItem[] {
    return this.timeLineItems;
  }

  public getSubject(): Subject<TimeLineItem> {
    return this.timeLineSubject;
  }

  private floodTimeLine(): void {
    this.timeLineItems.forEach((timeLineItem: TimeLineItem) => {
      this.timeLineSubject.next(timeLineItem);
    });
  }

}
