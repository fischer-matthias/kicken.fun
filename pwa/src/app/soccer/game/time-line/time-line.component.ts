import { Component } from '@angular/core';

import { TimeLineItem } from '../../models/time-line-item';
import { TimeLineService } from '../time-line.service';

@Component({
  selector: 'soccer-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent {

  public timeLineItems: TimeLineItem[] = [];

  constructor(private timeLineService: TimeLineService) {
    this.timeLineService.getSubject().subscribe((timeLineItem: TimeLineItem) => {
      this.timeLineItems.push(timeLineItem);
    });
  }

}
