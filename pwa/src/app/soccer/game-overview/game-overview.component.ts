import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'soccer-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {

  private club: string;
  private team: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        if(!params.club || !params.team) {
          this.router.navigate(['/club-selection']);
        } else {
          this.club = params.club;
          this.team = params.team;
        }
      });
  }

}
