import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { SoccerModule } from './soccer/soccer.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    SoccerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
