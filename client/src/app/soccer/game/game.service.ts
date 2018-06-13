import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameOfflineStorageService } from './../game-offline-storage.service';

import { TimeService } from './time.service';
import { GoalService } from './goal.service';
import { CardService } from './card.service';
import { TimeLineService } from './time-line.service';

import { GameTime } from '../models/game-time';
import { GameStatus } from './../models/game-status';
import { Game } from '../models/game';

@Injectable()
export class GameService {

  private game: Game;
  private resetSubject: Subject<boolean>;

  constructor(private gameOfflineStorage: GameOfflineStorageService,
              private timeService: TimeService, private goalService: GoalService,
              private cardService: CardService, private timeLineService: TimeLineService) {
    this.resetSubject = new Subject();
  }

  public getResetSubject(): Subject<boolean> {
    return this.resetSubject;
  }

  public generateGame(teamId: string): string {

    this.clear();

    this.game = new Game();
    this.game.id = Date.now() + '';
    this.game.teamId = teamId;
    this.game.gameTime = new GameTime();
    this.game.gameStatus = new GameStatus();
    this.game.goals = [];
    this.game.cards = [];
    this.game.timeLineItems = [];

    this.resetRemoteSubjects();
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
    this.timeLineService.clear();
    this.timeService.clear();
    this.goalService.clear();
    this.goalService.clear();
    this.cardService.clear();

    this.resetRemoteSubjects();
  }

  private collectCurrentInformation(): void {
    this.game.gameTime = this.timeService.getGameTime();
    this.game.gameStatus = this.timeService.getGameStatus();
    this.game.goals = this.goalService.getGoals();
    this.game.stats = this.goalService.getStats();
    this.game.cards = this.cardService.getCards();
    this.game.timeLineItems = this.timeLineService.getItems();
  }

  private writeToDatabase(): void {
    this.gameOfflineStorage.saveGame(this.game);
  }

  private loadGameInformations(id: string): void {
    this.game = this.gameOfflineStorage.getGame(id);

    if (this.game === null) {
      console.error('No game in cache!');

      this.gameOfflineStorage.getGames().then((areGamesAvailable) => {
        if (areGamesAvailable) {
          this.loadGameInformations(id);
        } else {
          console.error('Game ' + id + ' not found!');
          return;
        }
      }).catch((error) => {
        console.error(error);
        return;
      });

      return;
    }

    console.log('Load game informations.');
    this.setGameInformations();
  }

  private setGameInformations(): void {
    this.timeService.setGameTime(this.game.gameTime);
    this.timeService.setGameStatus(this.game.gameStatus);
    this.goalService.setGoals(this.game.goals);
    this.goalService.setStats(this.game.stats);
    this.cardService.setCards(this.game.cards);
    this.timeLineService.setItems(this.game.timeLineItems);
  }

  private resetRemoteSubjects(): void {
    this.resetSubject.next(true);
  }
}
