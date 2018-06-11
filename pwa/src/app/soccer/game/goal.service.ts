import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { Stats } from '../models/stats';
import { Goal } from '../models/goal';
import { TimeLineItem } from '../models/time-line-item';
import { TimeLineService } from './time-line.service';

@Injectable()
export class GoalService {

  private stats: Stats;
  private statsSubject: BehaviorSubject<Stats>;

  private goals: Goal[];
  private goalSubject: Subject<TimeLineItem>;

  constructor(private timeLineService: TimeLineService) {
    this.clear();
  }

  public clear(): void {
    this.stats = new Stats();
    this.statsSubject = new BehaviorSubject(this.stats);

    this.goals = [];
    this.goalSubject = this.timeLineService.getSubject();
  }

  public getStatsSubject(): BehaviorSubject<Stats> {
    return this.statsSubject;
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

  // These methods are just to save / reset stats

  public getGoals(): Goal[] {
    return this.goals;
  }

  public setGoals(goals: Goal[]): void {
    this.goals = goals;
  }

  public getStats(): Stats {
    return this.stats;
  }

  public setStats(stats: Stats): void {
    this.stats = stats;
    this.statsSubject.next(stats);
  }

}
