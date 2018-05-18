import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { StoredTeam } from './models/stored-team';
import { Team } from './models/team';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class OfflineStorageService {

  private teams: StoredTeam[] = [];

  constructor(private localStorage: LocalStorage) { 
    this.getTeams();
  }

  public addTeam(team: Team): void {
    if(this.isTeamAvailable(team)) {
      return;
    }

    let storedTeam = new StoredTeam();
    storedTeam.team = team;

    this.teams.push(storedTeam);
    this.saveTeams();
  }

  public getPlayers(teamID: string): Player[] {
    for(var i = 0; i < this.teams.length; i++) {
      if(this.teams[i].team.value == teamID) {
        return this.teams[i].players;
      }
    }

    return [];
  }

  public setPlayers(teamID: string, players: Player[]): void {
    for(var i = 0; i < this.teams.length; i++) {
      if(this.teams[i].team.value == teamID) {
        this.teams[i].players = players;
        this.saveTeams();
      }
    }
  }

  private isTeamAvailable(team: Team): boolean {

    let isAvailable = false;

    for(let i = 0; i < this.teams.length; i++) {
      if(this.teams[i].team.value == team.value) {
        isAvailable = true;
      }
    }

    return isAvailable;
  }

  private saveTeams(): void {
    this.localStorage.setItem('teams', this.teams).subscribe(() => {});
  }

  private getTeams(): any {
    this.localStorage.getItem('teams').subscribe((teams: StoredTeam[]) => {
      if(teams) {
        this.teams = teams;
      }
    });
  }
}
