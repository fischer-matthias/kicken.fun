import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PlayerSelectionDialog } from './player-selection-dialog/player-selection-dialog.component';

import { Player } from '../models/player';
import { Goal } from '../models/goal';
import { Card } from '../models/card';
import { Stats } from '../models/stats';
import { GameStatus } from '../models/game-status';
import { Time } from '../models/time';

import { GameService } from './game.service';
import { PlayerService } from '../player.service';
import { TimeService } from '../game/time.service';
import { GoalService } from '../game/goal.service';
import { CardService } from '../game/card.service';

@Component({
  selector: 'soccer-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit, OnDestroy {

  public teamId: string;
  public teamName: string = 'Freund';

  public players: Player[];
  public stats: Stats = new Stats();
  public gameStatus: GameStatus = new GameStatus();
  public time = { timeInSeconds: 0, secondHalf: false } as Time;

  private second = 1000;

  private resetSubscription: Subscription;
  private goalStatsSubscription: Subscription;
  private timeStatusSubscrtiption: Subscription;

  constructor(private router: Router, private route: ActivatedRoute,
              private dialog: MatDialog,
              private gameService: GameService,
              private playerService: PlayerService, private timeService: TimeService,
              private goalService: GoalService, private cardService: CardService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        if (!params.team) {
          this.router.navigate(['/club-selection']);
        } else {
          this.prepareGame(params);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.resetSubscription && this.goalStatsSubscription && this.timeStatusSubscrtiption) {
      this.resetSubscription.unsubscribe();
      this.goalStatsSubscription.unsubscribe();
      this.timeStatusSubscrtiption.unsubscribe();
    }
  }

  private prepareGame(params: any): void {

    this.subscribeResetSubject();

    this.teamId = params.team;
    this.loadPlayers();

    if (params.gameId) {
      this.gameService.loadGameById(params.gameId);
    } else {
      this.gameService.generateGame(this.teamId);
    }

    this.teamName = this.playerService.getTeamName(this.teamId);
  }

  private subscribeResetSubject(): void {
    this.resetSubscription = this.gameService.getResetSubject().subscribe((reset: boolean) => {
      if (reset) {
        this.goalStatsSubscription = this.goalService.getStatsSubject().subscribe((stats: Stats) => {
          this.stats = stats;
        });

        this.timeStatusSubscrtiption = this.timeService.getTimeStatusSubject().subscribe((gameStatus: GameStatus) => {

          this.gameStatus = gameStatus;
          this.second = 0;
          this.getTimeInSeconds();
        });
      }
    });
  }

  private loadPlayers(): void {
    this.playerService.getPlayers(this.teamId)
      .subscribe(data => {
        this.players = data as Player[];
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

    this.saveGame();
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

    this.saveGame();
  }

  private startTimer(): void {

    this.timeService.start();
    this.getTimeInSeconds();
    this.saveGame();
  }

  private stopTimer(): void {

    this.timeService.stop();
    this.saveGame();
  }

  private getTimeInSeconds(): void {
    setTimeout(() => {

      this.second = 1000;
      this.time = this.timeService.getTime();

      if (this.gameStatus.runFlag) {
        this.getTimeInSeconds();
      }
    }, this.second);
  }

  private saveGame(): void {
    this.gameService.saveState();
  }

}
