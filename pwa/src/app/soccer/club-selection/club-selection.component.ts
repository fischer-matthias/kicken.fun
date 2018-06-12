import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Game } from '../models/game';
import { GameOfflineStorageService } from './../game-offline-storage.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';
import { StoredTeam } from '../models/stored-team';
import { Team } from '../models/team';
import { TeamService } from '../team.service';
import { TeamsOfflineStorageService } from '../teams-offline-storage.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'soccer-club-selection',
  templateUrl: './club-selection.component.html',
  styleUrls: ['./club-selection.component.css']
})
export class ClubSelectionComponent implements OnInit {

  public teams: Team[] = [];
  public selectedTeam: Team;
  public searchTerm: FormControl = new FormControl();

  public previousTeams: StoredTeam[] = [];
  public previousGames: Game[] = [];

  constructor(private router: Router, private teamService: TeamService,
              private teamsOfflineStorage: TeamsOfflineStorageService,
              private gameOfflineStorage: GameOfflineStorageService) {}

  ngOnInit() {
    this.teamsOfflineStorage.getStoredTeams().subscribe(storedTeams => this.previousTeams = storedTeams);
    this.gameOfflineStorage.getStoredGames().subscribe(storedGames => this.previousGames = this.mapGames(storedGames));

    this.searchTerm.valueChanges
    .pipe(debounceTime(400))
    .subscribe(data => {
      if (typeof data === 'string') {
        this.teamService.searchTeam(data)
        .then((result) => {
          this.teams = result;
        })
        .catch((error) => {
          console.log(error);
        });
      }
    });
  }

  public startGame(): void {
    console.log('Start new game with new team ' + this.selectedTeam.name + '.');
    this.teamsOfflineStorage.addTeam(this.selectedTeam);
    this.router.navigate(['/game-overview'], { queryParams: { team: this.selectedTeam.value } });
  }

  public startGameWithPreviousGame(game: Game): void {
    console.log('Reenter existing game ' + game.id + '.');
    this.router.navigate(['/game-overview'], { queryParams: { team: game.teamId, gameId: game.id } });
  }

  public startGameWithPreviousTeam(team: StoredTeam): void {
    this.selectedTeam = team.team;
    this.startGame();
  }

  public selectTeam(event: MatAutocompleteSelectedEvent): void {
    this.selectedTeam = event.option.value;
  }

  public displayFn(team?: Team): string | undefined {
    return team ? team.name : undefined;
  }

  private mapGames(games: Game[]): Game[] {
    const mappedGames: Game[] = [];

    games.forEach((game: Game) => {
      for (let i = 0; i < this.previousTeams.length; i++) {
        if (this.previousTeams[i].team.value === game.teamId) {
          game.team = this.previousTeams[i].team;
          mappedGames.push(game);
          break;
        }
      }
    });

    return mappedGames;
  }

}

