import { Component, OnDestroy } from '@angular/core';

import { TimeLineItem } from '../../models/time-line-item';
import { TimeLineService } from '../time-line.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'soccer-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnDestroy {

  public timeLineItems: TimeLineItem[] = [];
  private timeLineSubscription: Subscription;

  constructor(private timeLineService: TimeLineService) {
    this.timeLineSubscription = this.timeLineService.getSubject().subscribe((timeLineItem: TimeLineItem) => {
      this.timeLineItems.push(timeLineItem);
    });
  }

  ngOnDestroy(): void {
    this.timeLineSubscription.unsubscribe();
  }

  public clear(): void {
    this.timeLineItems = [];
  }

}
