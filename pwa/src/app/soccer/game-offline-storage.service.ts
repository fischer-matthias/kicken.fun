import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject } from 'rxjs';

import { Game } from './models/game';

@Injectable({
  providedIn: 'root'
})
export class GameOfflineStorageService {

  private games: Game[];
  private gamesSubject: BehaviorSubject<Game[]>;

  constructor(private localStorage: LocalStorage) {
    this.games = [];
    this.gamesSubject = new BehaviorSubject([]);
    this.getGames();
  }

  public getStoredGames(): BehaviorSubject<Game[]> {
    return this.gamesSubject;
  }

  public getGames(): Promise<boolean> {
    console.log('Load games.');
    return new Promise((resolve, reject) => {
      this.localStorage.getItem('games').subscribe((games: Game[]) => {
        if (games) {
          this.games = games;
          this.gamesSubject.next(this.games);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public saveGame(game: Game): void {

    const index = this.findGameIndex(game.id);

    if (index > -1) {
      this.games[index] = game;
    } else {
      this.games.push(game);
    }

    this.saveGames();
  }

  public getGame(id: string): Game {

    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].id === id) {
        return this.games[i];
      }
    }

    return null;
  }

  private saveGames(): void {
    this.localStorage.setItem('games', this.games).subscribe(() => {
      this.getGames();
    });
  }

  private findGameIndex(id: string): number {
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].id === id) {
        return i;
      }
    }

    return -1;
  }
}
