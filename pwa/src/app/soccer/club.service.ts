import { Injectable } from '@angular/core';
import { Club } from "./models/club";

@Injectable()
export class ClubService {

  private mockdata = [
    {'value': 'FC Talge', 'key': 'fc-talge', 'teams': ['m1', 'm2', 'm3', 'd1']},
    {'value': 'Tus Bersenbrück', 'key': 'tus-bersenbrueck', 'teams': ['m1', 'm2', 'm3']},
    {'value': 'Tus Badbergen', 'key': 'tus-badbergen', 'teams': ['m1']},
  ];

  constructor() { }

  /**
   * Mock method that returns the clubs via Promise.
   */
  public getClubsMock(): Promise<Array<Club>> {
    return new Promise<Array<Club>>((resolve, reject) => {
      resolve(this.mockdata);
    });
  }

}
