import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Stats } from './models/stats';
import { Goal } from './models/goal';
import { TimeLineItem } from './models/time-line-item';

@Injectable()
export class GoalService {

  private stats: Stats;
  private statsSubject: Subject<Stats>;

  private goals: Goal[];
  private goalSubject: Subject<TimeLineItem>;

  constructor() {
    this.stats = new Stats();
    this.statsSubject = new Subject();

    this.goals = [];
    this.goalSubject = new Subject();
  }

  public getStatsSubject(): Subject<Stats> {
    return this.statsSubject;
  }

  public getGoalSubject(): Subject<TimeLineItem> {
    return this.goalSubject;
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
    this.goalSubject.next(goal);
  }

}
