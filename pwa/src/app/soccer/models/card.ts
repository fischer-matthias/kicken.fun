import { Player } from "./player";

export class Card {
  player: Player;
  timeInSeconds: Number;
  yellow: boolean = false;
  yellowRed: boolean = false;
  red: boolean = false;
}
