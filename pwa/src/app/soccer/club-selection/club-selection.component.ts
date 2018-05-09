import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

import { TeamService } from '../team.service';
import { Team } from '../models/team';

@Component({
  selector: 'soccer-club-selection',
  templateUrl: './club-selection.component.html',
  styleUrls: ['./club-selection.component.css']
})
export class ClubSelectionComponent implements OnInit {

  private teams: Team[] = [];
  private selectedTeam: Team;
	private searchTerm: FormControl = new FormControl();

  constructor(private teamService: TeamService, private router: Router) {
    this.searchTerm.valueChanges
   		.debounceTime(400) 
   		.subscribe(data => {
        if(typeof data === 'string') {
          this.teamService.searchTeam(data)
          .then((result) => {
            this.teams = result;
            console.log(this.teams);
          })
          .catch((error) => {
            console.log(error);
          });
        }
   		});
  }

  ngOnInit() {}

  public startGame(): void {
    console.log('Route to /game-overview.');
    this.router.navigate(['/game-overview'], { queryParams: { team: this.selectedTeam.value } });
  }

  public selectTeam(event: MatAutocompleteSelectedEvent): void {
    this.selectedTeam = event.option.value;
  }

  public displayFn(team?: Team): string | undefined {
    return team ? team.name : undefined;
  }

}
