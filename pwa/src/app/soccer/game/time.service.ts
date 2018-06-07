import { Injectable } from '@angular/core';
import { Time } from '../models/time';
import { GameTime } from '../models/game-time';

@Injectable()
export class TimeService {

  private halfTimeLengthInSeconds = 2700;

  private gameTime: GameTime;

  constructor() {
    this.gameTime = new GameTime();
  }

  public start(): void {
    if (this.gameTime.startFirstHalftimeTimestamp === null) {
      this.gameTime.startFirstHalftimeTimestamp = Date.now();
    } else if (this.gameTime.startSecondHalftimeTimestamp === null) {
      this.gameTime.startSecondHalftimeTimestamp = Date.now();
    }
  }

  public stop(): void {
    if (this.gameTime.endFirstHalftimeTimestamp === null) {
      this.gameTime.endFirstHalftimeTimestamp = Date.now();
    } else if (this.gameTime.endSecondHalftimeTimestamp === null) {
      this.gameTime.endSecondHalftimeTimestamp = Date.now();
    }
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

  public getGameTime(): GameTime {
    return this.gameTime;
  }
}
