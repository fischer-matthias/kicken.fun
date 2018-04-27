import { Component, OnInit } from '@angular/core';
import { Club } from "../models/club";
import { ClubService } from '../club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'soccer-club-selection',
  templateUrl: './club-selection.component.html',
  styleUrls: ['./club-selection.component.css']
})
export class ClubSelectionComponent implements OnInit {

  public clubs: Club[];
  public selectedClub: Club;
  public selectedTeam: string;

  constructor(private clubService: ClubService, private router: Router) { }

  ngOnInit() {
    this.clubService.getClubsMock()
      .then((result) => {
        this.clubs = result as Club[];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public startGame(): void {
    console.log('Route to /game-overview.');
    this.router.navigate(['/game-overview']);
  }

}
