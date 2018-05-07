// Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatButtonModule, MatSelectModule, MatDividerModule, MatListModule } from '@angular/material';

// provide services
import { ClubService } from './club.service';
import { PlayerService } from './player.service';
import { StopWatchService } from './stop-watch.service';
import { GoalService } from './goal.service';
import { CardService } from './card.service';

// declare components
import { HomeComponent } from './home/home.component';
import { ClubSelectionComponent } from './club-selection/club-selection.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { TimePipe } from './time.pipe';

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
    BrowserAnimationsModule,
    RouterModule.forRoot(soccerRoutes),
    HttpClientModule,

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule
  ],
  declarations: [HomeComponent, ClubSelectionComponent, GameOverviewComponent, TimePipe],
  providers: [ClubService, PlayerService, StopWatchService, GoalService, CardService],
  exports: [HomeComponent]
})
export class SoccerModule { }
