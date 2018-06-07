import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject } from 'rxjs';

import { StoredTeam } from './models/stored-team';
import { Team } from './models/team';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class TeamsOfflineStorageService {

  private teams: StoredTeam[] = [];
  private teamSubject: BehaviorSubject<StoredTeam[]>;

  constructor(private localStorage: LocalStorage) {
    this.teamSubject = new BehaviorSubject([]);
    this.getTeams();
  }

  public addTeam(team: Team): void {
    if (this.isTeamAvailable(team)) {
      return;
    }

    const storedTeam = new StoredTeam();
    storedTeam.team = team;

    this.teams.push(storedTeam);
    this.saveTeams();
  }

  public getStoredTeams(): BehaviorSubject<StoredTeam[]> {
    return this.teamSubject;
  }

  public getPlayers(teamID: string): Player[] {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].team.value === teamID) {
        return this.teams[i].players;
      }
    }

    return [];
  }

  public setPlayers(teamID: string, players: Player[]): void {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].team.value === teamID) {
        this.teams[i].players = players;
        this.saveTeams();
      }
    }
  }

  private isTeamAvailable(team: Team): boolean {

    let isAvailable = false;

    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].team.value === team.value) {
        isAvailable = true;
      }
    }

    return isAvailable;
  }

  private saveTeams(): void {
    this.localStorage.setItem('teams', this.teams).subscribe(() => {
      this.getTeams();
    });
  }

  private getTeams(): any {
    this.localStorage.getItem('teams').subscribe((teams: StoredTeam[]) => {
      if (teams) {
        this.teams = teams;
        this.teamSubject.next(this.teams);
      }
    });
  }
}
