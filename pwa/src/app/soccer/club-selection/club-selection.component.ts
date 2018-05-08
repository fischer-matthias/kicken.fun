import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private teamService: TeamService, private router: Router) { }

  ngOnInit() {
    this.teamService.searchTeam()
      .then((result) => {
        this.teams = result;
        console.log(this.teams);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public startGame(): void {
    console.log('Route to /game-overview.');
    this.router.navigate(['/game-overview'], { queryParams: { team: this.selectedTeam } });
  }

}
