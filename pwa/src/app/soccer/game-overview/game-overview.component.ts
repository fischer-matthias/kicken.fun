import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../models/player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'soccer-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {

  private club: string;
  private team: string;

  private players: Player[];

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        if(!params.club || !params.team) {
          this.router.navigate(['/club-selection']);
        } else {
          this.club = params.club;
          this.team = params.team;
          this.loadPlayers();
        }
      });
  }

  private loadPlayers(): void {
    this.playerService.getPlayers(this.club, this.team)
      .subscribe(data => {
        this.players = data as Player[];
        console.log(data);
      });
  }

}
