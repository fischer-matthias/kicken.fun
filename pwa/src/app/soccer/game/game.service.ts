import { Injectable } from '@angular/core';
import { TimeService } from './time.service';
import { GoalService } from './goal.service';
import { CardService } from './card.service';
import { TimeLineService } from './time-line.service';
import { Goal } from '../models/goal';
import { Card } from '../models/card';
import { TimeLineItem } from '../models/time-line-item';
import { Stats } from '../models/stats';
import { GameTime } from '../models/game-time';

@Injectable()
export class GameService {

  private id: number;

  private gameTime: GameTime;
  private goals: Goal[];
  private stats: Stats;
  private cards: Card[];
  private timeLineItems: TimeLineItem[];

  constructor(private timeService: TimeService, private goalService: GoalService,
              private cardService: CardService, private timeLineService: TimeLineService) {}

  public generateGame(): number {
    return this.id = Date.now();
  }

  public setId(id: number): void {
    this.id = id;
    this.loadGameInformations();
  }

  public saveState(): void {
    this.collectCurrentInformation();
    this.writeToDatabase();
  }

  private collectCurrentInformation(): void {
    this.gameTime = this.timeService.getGameTime();
    this.goals = this.goalService.getGoals();
    this.stats = this.goalService.getStats();
    this.cards = this.cardService.getCards();
    this.timeLineItems = this.timeLineService.getItems();
  }

  private writeToDatabase(): void {

  }

  private loadGameInformations(): void {
    // load times, cards, goals by id
  }
}
