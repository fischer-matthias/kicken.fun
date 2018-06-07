import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PlayerSelectionDialog } from '../player-selection-dialog/player-selection-dialog.component';

import { Player } from '../models/player';
import { Goal } from '../models/goal';
import { Card } from '../models/card';
import { Stats } from '../models/stats';
import { GameStatus } from '../models/game-status';
import { Time } from '../models/time';

import { PlayerService } from '../player.service';
import { TimeService } from '../game/time.service';
import { GoalService } from '../game/goal.service';
import { CardService } from '../game/card.service';

@Component({
  selector: 'soccer-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {

  public team: string;
  public players: Player[];
  public stats: Stats = new Stats();
  public gameStatus: GameStatus = new GameStatus();
  public time = { timeInSeconds: 0, secondHalf: false } as Time;

  constructor(private router: Router, private route: ActivatedRoute,
              private dialog: MatDialog,
              private playerService: PlayerService, private timeService: TimeService,
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

  public selectPlayerFor(goal = false, yellowCard = false, redCard = false): void {
    if (goal || yellowCard || redCard) {
      const dialogRef = this.dialog.open(PlayerSelectionDialog, {
        width: '100%',
        data: { players: this.players }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined && result !== null) {
          if (goal) {
            this.addGoal(result);
          } else if (yellowCard) {
            this.addCard(result, true);
          } else if (redCard) {
            this.addCard(result, false, true);
          }
        }
      });
    }
  }

  private addGoal(player: Player = null): void {
    const goal = { own: (player == null ? false : true), player: player, time: this.time } as Goal;
    this.goalService.addGoal(goal);
  }

  private addCard(player: Player, yellow = false, red = false): void {
    const card = { player: player, time: this.time, yellow: yellow, yellowRed: false, red: red } as Card;

    if (this.cardService.playerHasYellowCard(player)) {
      card.yellow = false;
      card.yellowRed = true;
    }

    if (!this.cardService.playerHasRedCard(player)) {
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
    this.timeService.start();
    this.getTimeInSeconds();

    if (this.gameStatus.isSecondHalf) {
      this.gameStatus.statusString = 'Abpfiff';
    } else {
      this.gameStatus.statusString = 'Halbzeit';
    }
  }

  private stopTimer(): void {
    this.gameStatus.runFlag = false;
    this.timeService.stop();
    this.gameStatus.statusString = 'Anpfiff';
  }

  private getTimeInSeconds(): void {
    setTimeout(() => {

      this.time = this.timeService.getTime();
      this.gameStatus.isSecondHalf = this.timeService.isSecondHalf();

      if (this.gameStatus.runFlag) {
        this.getTimeInSeconds();
      }
    }, 1000);
  }

}
