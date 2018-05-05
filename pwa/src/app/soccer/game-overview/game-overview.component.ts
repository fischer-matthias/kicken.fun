import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../models/player';
import { PlayerService } from '../player.service';
import { StopWatchService } from '../stop-watch.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'soccer-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {

  private club: string;
  private team: string;

  private players: Player[];

  private timeObservable: Observable<Number>;
  private timeInSeconds: Number = 0;

  constructor(private router: Router, private route: ActivatedRoute,
      private playerService: PlayerService, private stopWatch: StopWatchService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        if (!params.club || !params.team) {
          this.router.navigate(['/club-selection']);
        } else {
          this.club = params.club;
          this.team = params.team;
          this.loadPlayers();
        }
      });

    this.timeObservable = this.stopWatch.getObservable();
    this.timeObservable.subscribe((value) => {
      this.timeInSeconds = value;
    });
  }

  private loadPlayers(): void {
    this.playerService.getPlayers(this.club, this.team)
      .subscribe(data => {
        this.players = data as Player[];
      });
  }

  public startTimer(): void {
    this.stopWatch.startTimer();
  }

  public stopTimer(): void {
    this.stopWatch.stopTimer();
  }

}
