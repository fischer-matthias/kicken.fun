import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Time } from '../models/time';
import { GameTime } from '../models/game-time';
import { GameStatus } from './../models/game-status';

@Injectable()
export class TimeService {

  private halfTimeLengthInSeconds = 2700;

  private gameTime: GameTime;
  private gameStatus: GameStatus;

  private gameStatusSubject: Subject<GameStatus>;

  constructor() {
    this.clear();
  }

  public clear(): void {
    this.gameTime = new GameTime();
    this.gameStatus = new GameStatus();
    this.gameStatusSubject = new Subject();
  }

  public getTimeStatusSubject(): Subject<GameStatus> {
    return this.gameStatusSubject;
  }

  public start(): void {

    this.gameStatus.runFlag = true;

    if (this.gameTime.startFirstHalftimeTimestamp === null) {

      this.gameTime.startFirstHalftimeTimestamp = Date.now();
      this.gameStatus.statusString = 'Halbzeit';

    } else if (this.gameTime.startSecondHalftimeTimestamp === null) {

      this.gameTime.startSecondHalftimeTimestamp = Date.now();
      this.gameStatus.statusString = 'Abpfiff';
      this.gameStatus.isSecondHalf = true;
    }

    this.gameStatusSubject.next(this.gameStatus);
  }

  public stop(): void {

    this.gameStatus.runFlag = false;

    if (this.gameTime.endFirstHalftimeTimestamp === null) {
      this.gameTime.endFirstHalftimeTimestamp = Date.now();
    } else if (this.gameTime.endSecondHalftimeTimestamp === null) {
      this.gameTime.endSecondHalftimeTimestamp = Date.now();
    }

    this.gameStatus.statusString = 'Anpfiff';
    this.gameStatusSubject.next(this.gameStatus);
  }

  public isSecondHalf(): boolean {
    return this.gameTime.endFirstHalftimeTimestamp !== null;
  }

  public getTime(): Time {

    const time = new Time();

    if (this.gameTime.startSecondHalftimeTimestamp === null) {
      time.timeInSeconds = (Date.now() - this.gameTime.startFirstHalftimeTimestamp) / 1000;
      time.secondHalf = false;
    } else {
      time.timeInSeconds = ((Date.now() - this.gameTime.startSecondHalftimeTimestamp) / 1000) + this.halfTimeLengthInSeconds;
      time.secondHalf = true;
    }

    time.timeInSeconds = Math.floor(time.timeInSeconds);

    return time;
  }

  // These methods are just to save / reset stats
  public setGameTime(gameTime: GameTime): void {
    this.gameTime = gameTime;
  }

  public setGameStatus(gameStatus: GameStatus): void {
    this.gameStatus = gameStatus;
    this.gameStatusSubject.next(this.gameStatus);
  }

  public getGameTime(): GameTime {
    return this.gameTime;
  }

  public getGameStatus(): GameStatus {
    return this.gameStatus;
  }
}
