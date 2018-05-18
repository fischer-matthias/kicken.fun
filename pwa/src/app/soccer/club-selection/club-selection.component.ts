import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from "rxjs/operators";

import { OfflineStorageService } from '../offline-storage.service';
import { TeamService } from '../team.service';

import { Team } from '../models/team';
import { StoredTeam } from '../models/stored-team';

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

  constructor(private router: Router, private teamService: TeamService,
              private offlineStorage: OfflineStorageService) {}

  ngOnInit() {
    this.offlineStorage.getStoredTeams().subscribe(storedTeams => this.previousTeams = storedTeams);

    this.searchTerm.valueChanges
   		.pipe(debounceTime(400))
   		.subscribe(data => {
        if(typeof data === 'string') {
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
    this.offlineStorage.addTeam(this.selectedTeam);
    this.router.navigate(['/game-overview'], { queryParams: { team: this.selectedTeam.value } });
  }

  public startGameWithPreviousGame(team: StoredTeam): void {
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
