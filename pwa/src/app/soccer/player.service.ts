import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Team } from './models/team';
import { Player } from './models/player';

@Injectable()
export class PlayerService {

  constructor(private httpClient: HttpClient) { }

  public getPlayers(team: string): Observable<Object> {

    return this.httpClient
      .get('http://localhost:8888/players/' + team);
  }

}
