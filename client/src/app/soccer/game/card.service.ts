import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TimeLineService } from './time-line.service';

import { Card } from '../models/card';
import { Player } from '../models/player';
import { TimeLineItem } from '../models/time-line-item';

@Injectable()
export class CardService {

  private cards: Card[];
  private cardSubject: Subject<TimeLineItem>;

  constructor(private timeLineService: TimeLineService) {
    this.clear();
  }

  public clear(): void {
    this.cards = [];
    this.cardSubject = this.timeLineService.getSubject();
  }

  public addCard(card: Card): void {
    this.cards.push(card);
    this.addCardToTimeLine(card);
  }

  public playerHasYellowCard(player: Player): boolean {

    let hasYellow = false;
    this.cards.forEach((card) => {
      if (card.player.nachname === player.nachname && card.player.vorname === player.vorname) {
        hasYellow = true;
      }
    });

    return hasYellow;
  }

  public playerHasRedCard(player: Player): boolean {

    let hasRed = false;
    this.cards.forEach((card) => {
      if ( (card.player.nachname === player.nachname && card.player.vorname === player.vorname) && (card.yellowRed || card.red) ) {
        hasRed = true;
      }
    });

    return hasRed;
  }

  private addCardToTimeLine(card: Card): void {
    card.card = true;
    this.cardSubject.next(card);
  }

  // These methods are just to save / reset stats

  public getCards(): Card[] {
    return this.cards;
  }

  public setCards(cards: Card[]): void {
    this.cards = cards;
  }

}
