import { Component, OnInit } from '@angular/core';

import { GoalService } from '../goal.service';
import { CardService } from '../card.service';

import { TimeLineItem } from '../models/time-line-item';

@Component({
  selector: 'soccer-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent {

  private timeLineItems: TimeLineItem[] = [];

  constructor(private goalService: GoalService, private cardService: CardService) { 
    this.goalService.getGoalSubject().subscribe((item) => this.timeLineItems.push(item));
    this.cardService.getCardSubject().subscribe((item) => this.timeLineItems.push(item));
  }

}
