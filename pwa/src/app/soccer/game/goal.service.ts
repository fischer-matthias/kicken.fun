import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Stats } from '../models/stats';
import { Goal } from '../models/goal';
import { TimeLineItem } from '../models/time-line-item';
import { TimeLineService } from './time-line.service';

@Injectable()
export class GoalService {

  private stats: Stats;
  private statsSubject: Subject<Stats>;

  private goals: Goal[];
  private goalSubject: Subject<TimeLineItem>;

  constructor(private timeLineService: TimeLineService) {
    this.stats = new Stats();
    this.statsSubject = new Subject();

    this.goals = [];
    this.goalSubject = this.timeLineService.getSubject();
  }

  public getStatsSubject(): Subject<Stats> {
    return this.statsSubject;
  }

  public getGoals(): Goal[] {
    return this.goals;
  }

  public addGoal(goal: Goal): void {
    this.goals.push(goal);
    if (goal.own) {
      this.stats.own++;
    } else {
      this.stats.enemy++;
    }
    this.statsSubject.next(this.stats);

    this.addGoalToTimeLine(goal);
  }

  private addGoalToTimeLine(goal: Goal): void {
    goal.goal = true;
    this.goalSubject.next(goal);
  }

}
