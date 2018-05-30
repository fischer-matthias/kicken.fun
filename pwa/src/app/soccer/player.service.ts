import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { OfflineStorageService } from './offline-storage.service';

import { Team } from './models/team';
import { Player } from './models/player';

@Injectable()
export class PlayerService {

  constructor(private httpClient: HttpClient, private offlineStorage: OfflineStorageService) { }

  public getPlayers(teamID: string): Observable<Object> {
    const playerSubject = new Subject<Object>();

    this.httpClient
      .get('https://kicken.fun/api/players/' + teamID).subscribe((players: Player[]) => {
        this.offlineStorage.setPlayers(teamID, players);
        playerSubject.next(players);
      }, (error) => {
        const players = this.offlineStorage.getPlayers(teamID);
        playerSubject.next(players);
      });

    return playerSubject;
  }

}
