import { GameOfflineStorageService } from './../game-offline-storage.service';
import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { TeamsOfflineStorageService } from '../teams-offline-storage.service';
import { TeamService } from '../team.service';

import { Team } from '../models/team';
import { StoredTeam } from '../models/stored-team';
import { Game } from '../models/game';

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
    this.gameOfflineStorage.getStoredGames().subscribe(storedGames => this.previousGames = storedGames);

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
    console.log('Route to /game-overview.');
    this.teamsOfflineStorage.addTeam(this.selectedTeam);
    this.router.navigate(['/game-overview'], { queryParams: { team: this.selectedTeam.value } });
  }

  public startGameWithPreviousGame(game: Game): void {
    // todo
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

}
