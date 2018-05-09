import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Team } from '../models/team';
import { Player } from '../models/player';
import { Goal } from '../models/goal';
import { Card } from '../models/card';
import { Stats } from '../models/stats';
import { GameStatus } from '../models/game-status';

import { PlayerService } from '../player.service';
import { StopWatchService } from '../stop-watch.service';
import { GoalService } from '../goal.service';
import { CardService } from '../card.service';

@Component({
  selector: 'soccer-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {

  private team: string;
  private players: Player[];
  private stats: Stats = new Stats();
  private gameStatus: GameStatus = new GameStatus();
  private timeInSeconds: Number = 0;

  constructor(private router: Router, private route: ActivatedRoute,
    private playerService: PlayerService, private stopWatch: StopWatchService,
    private goalService: GoalService, private cardService: CardService) {
    this.goalService.getStatsSubject().subscribe((stats) => {
      this.stats = stats;
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        if (!params.team) {
          this.router.navigate(['/club-selection']);
        } else {
          this.team = params.team;
          this.loadPlayers();
        }
      });
  }

  public switchStatus(): void {
    if (this.gameStatus.runFlag) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  public addEnemyGoal(): void {
    const goal = { own: false, player: null, timeInSeconds: this.timeInSeconds } as Goal;
    this.goalService.addGoal(goal);
  }

  public addGoal(player: Player): void {
    const goal = { own: true, player: player, timeInSeconds: this.timeInSeconds } as Goal;
    this.goalService.addGoal(goal);
  }

  public addCard(player: Player, yellow = false, red = false): void {
    const card = { player: player, timeInSeconds: this.timeInSeconds, yellow: yellow, yellowRed: false, red: red } as Card;

    if(this.cardService.playerHasYellowCard(player)) {
      card.yellow = false;
      card.yellowRed = true;
    }

    if(!this.cardService.playerHasRedCard(player)) {
      this.cardService.addCard(card);
    }
  }

  private loadPlayers(): void {
    this.playerService.getPlayers(this.team)
      .subscribe(data => {
        this.players = data as Player[];
      });
  }

  private startTimer(): void {
    this.gameStatus.runFlag = true;
    this.stopWatch.start();
    this.getTimeInSeconds();

    if (this.gameStatus.isSecondHalf) {
      this.gameStatus.statusString = 'End';
    } else {
      this.gameStatus.statusString = 'Halftime';
    }
  }

  private stopTimer(): void {
    this.gameStatus.runFlag = false;
    this.stopWatch.stop();
    this.gameStatus.statusString = 'Start';
  }

  private getTimeInSeconds(): void {
    setTimeout(() => {

      this.timeInSeconds = this.stopWatch.getTimeInSeconds();
      this.gameStatus.isSecondHalf = this.stopWatch.isSecondHalf();

      if (this.gameStatus.runFlag) {
        this.getTimeInSeconds();
      }
    }, 1000);
  }

}
