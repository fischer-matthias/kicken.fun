import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Team } from './models/team';

@Injectable()
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  public searchTeam(searchTerm: string): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      this.httpClient.get('https://kicken.fun/api/clubs/' + searchTerm)
        .subscribe(data => resolve(data as Team[]));
    });
  }
}
