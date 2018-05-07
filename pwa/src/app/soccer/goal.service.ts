import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Stats } from './models/stats';
import { Goal } from './models/goal';

@Injectable()
export class GoalService {

  private stats: Stats;
  private statsSubject: Subject<Stats>;
  private goals: Goal[];

  constructor() {
    this.stats = new Stats();
    this.statsSubject = new Subject();
    this.goals = [];
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
  }

}
