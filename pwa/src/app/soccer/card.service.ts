import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Card } from './models/card';
import { Player } from './models/player';
import { TimeLineItem } from './models/time-line-item';

@Injectable()
export class CardService {

  private cards: Card[] = [];
  private cardSubject: Subject<TimeLineItem>;

  constructor() { 
    this.cardSubject = new Subject();
  }

  public addCard(card: Card): void {
    this.cards.push(card);
    this.cardSubject.next(card);
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getCardSubject(): Subject<TimeLineItem> {
    return this.cardSubject;
  }

  public playerHasYellowCard(player: Player): boolean {

    var hasYellow = false;
    this.cards.forEach((card) => {
      if(card.player.nachname === player.nachname && card.player.vorname === player.vorname) {
        hasYellow = true;
      }
    });

    return hasYellow;
  }

  public playerHasRedCard(player: Player): boolean {

    var hasRed = false;
    this.cards.forEach((card) => {
      if( (card.player.nachname === player.nachname && card.player.vorname === player.vorname) && (card.yellowRed || card.red) ) {
        hasRed = true;
      }
    });

    return hasRed;
  }

}
