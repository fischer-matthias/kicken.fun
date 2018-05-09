import { Injectable } from '@angular/core';
import { Card } from './models/card';
import { Player } from './models/player';

@Injectable()
export class CardService {

  private cards: Card[] = [];

  constructor() { }

  public addCard(card: Card): void {
    this.cards.push(card);
  }

  public getCards(): Card[] {
    return this.cards;
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
