import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Club } from "./models/club";

@Injectable()
export class ClubService {

  private mockdata = [
    {'value': 'FC Talge', 'key': 'fc-talge', 'teams': ['m1', 'm2', 'm3', 'd1']},
    {'value': 'Tus Bersenbrück', 'key': 'tus-bersenbrueck', 'teams': ['m1', 'm2', 'm3']},
    {'value': 'Tus Badbergen', 'key': 'tus-badbergen', 'teams': ['m1']},
  ];

  constructor(private httpClient: HttpClient) { }

  /**
   * Mock method that returns the clubs via Promise.
   */
  public getClubsMock(): Promise<Array<Club>> {

    this.httpClient.get('https://www.fupa.net/fupa/api.php?q=FC%20Talge&p=json_team_liste&saison=&liga_id=')
      .subscribe(data => console.log(data));

    return new Promise<Array<Club>>((resolve, reject) => {
      resolve(this.mockdata);
    });
  }

}
