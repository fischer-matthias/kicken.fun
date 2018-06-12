// Import modules
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
        MatToolbarModule, MatCardModule, MatButtonModule, MatSelectModule,
        MatDividerModule, MatListModule, MatAutocompleteModule, MatInputModule, MatDialogModule, MatIconModule
      } from '@angular/material';

// provide services
import { TeamService } from './team.service';
import { PlayerService } from './player.service';
import { GameService } from './game/game.service';
import { TimeLineService } from './game/time-line.service';
import { TimeService } from './game/time.service';
import { GoalService } from './game/goal.service';
import { CardService } from './game/card.service';

// declare components
import { HomeComponent } from './home/home.component';
import { ClubSelectionComponent } from './club-selection/club-selection.component';
import { GameOverviewComponent } from './game/game-overview.component';
import { TimePipe } from './time.pipe';
import { PlayerSelectionDialog } from './game/player-selection-dialog/player-selection-dialog.component';
import { TimeLineComponent } from './game/time-line/time-line.component';

// declare routes
export const soccerRoutes = [
  { path: 'club-selection', pathMatch: 'full', component: ClubSelectionComponent },
  { path: 'game-overview', pathMath: 'full', component: GameOverviewComponent },
  { path: '', pathMatch: 'full', redirectTo: '/club-selection' },
  { path: '**', pathMatch: 'full', redirectTo: '/club-selection' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(soccerRoutes, {useHash: true}),
    HttpClientModule,

    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule
  ],
  entryComponents: [PlayerSelectionDialog],
  declarations: [HomeComponent, ClubSelectionComponent, GameOverviewComponent, TimePipe, PlayerSelectionDialog, TimeLineComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    TeamService,
    PlayerService,
    GameService,
    TimeLineService,
    TimeService,
    GoalService,
    CardService
  ],
  exports: [HomeComponent]
})
export class SoccerModule { }
