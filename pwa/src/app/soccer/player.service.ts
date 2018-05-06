import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Player } from './models/player';

@Injectable()
export class PlayerService {

  constructor(private httpClient: HttpClient) { }

  public getPlayers(club: string, team: string): Observable<Object> {

    return this.httpClient
      .get('http://localhost:8888/players/' + club + '/' + team);
  }

}
