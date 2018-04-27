import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SoccerModule } from './soccer/soccer.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SoccerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
