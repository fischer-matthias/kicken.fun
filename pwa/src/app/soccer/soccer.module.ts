// Import modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatSelectModule } from '@angular/material';

// provide services
import { ClubService } from './club.service';

// declare components
import { HomeComponent } from './home/home.component';
import { ClubSelectionComponent } from './club-selection/club-selection.component';

// declare routes
export const soccerRoutes = [
  {path: 'club-selection', pathMatch: 'full', component: ClubSelectionComponent},
  {path: '', pathMatch: 'full', redirectTo: '/club-selection'},
  {path: '**', pathMatch: 'full', redirectTo: '/club-selection'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(soccerRoutes),

    MatToolbarModule,
    MatCardModule,
    MatSelectModule
  ],
  declarations: [HomeComponent, ClubSelectionComponent],
  providers: [ClubService],
  exports: [HomeComponent]
})
export class SoccerModule { }
