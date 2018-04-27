import { Component, OnInit } from '@angular/core';
import { Club } from "../models/club";
import { ClubService } from '../club.service';

@Component({
  selector: 'soccer-club-selection',
  templateUrl: './club-selection.component.html',
  styleUrls: ['./club-selection.component.css']
})
export class ClubSelectionComponent implements OnInit {

  public clubs: Club[];
  public selectedClub: Club;

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.clubService.getClubsMock()
      .then((result) => {
        this.clubs = result as Club[];
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
