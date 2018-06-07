import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { TimeService } from './time.service';
import { GoalService } from './goal.service';
import { CardService } from './card.service';
import { TimeLineService } from './time-line.service';

import { GameTime } from '../models/game-time';
import { Game } from '../models/game';

@Injectable()
export class GameService {

  private game: Game;

  constructor(private localStorage: LocalStorage,
              private timeService: TimeService, private goalService: GoalService,
              private cardService: CardService, private timeLineService: TimeLineService) {}

  public generateGame(teamId: string): string {

    this.clear();

    this.game = new Game();
    this.game.id = Date.now() + '';
    this.game.teamId = teamId;
    this.game.gameTime = new GameTime();
    this.game.goals = [];
    this.game.cards = [];
    this.game.timeLineItems = [];

    return this.game.id;
  }

  public loadGameById(id: string): void {
    this.clear();
    this.loadGameInformations(id);
  }

  public saveState(): void {
    this.collectCurrentInformation();
    this.writeToDatabase();
  }

  private clear(): void {
    this.timeService.clear();
    this.goalService.clear();
    this.goalService.clear();
    this.cardService.clear();
    this.timeLineService.clear();
  }

  private collectCurrentInformation(): void {
    this.game.gameTime = this.timeService.getGameTime();
    this.game.goals = this.goalService.getGoals();
    this.game.stats = this.goalService.getStats();
    this.game.cards = this.cardService.getCards();
    this.game.timeLineItems = this.timeLineService.getItems();
  }

  private writeToDatabase(): void {
    this.localStorage.setItem(this.game.id + '', this.game).subscribe(() => {
      console.log('Saved game.');
    });
  }

  private loadGameInformations(id: string): void {
    this.localStorage.getItem(id).subscribe((game: Game) => {
      this.game = game;
      this.setGameInformations();
    });
  }

  private setGameInformations(): void {
    this.timeService.setGameTime(this.game.gameTime);
    this.goalService.setGoals(this.game.goals);
    this.goalService.setStats(this.game.stats);
    this.cardService.setCards(this.game.cards);
    this.timeLineService.setItems(this.game.timeLineItems);
  }
}
