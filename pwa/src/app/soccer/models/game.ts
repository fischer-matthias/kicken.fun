import { GameTime } from './game-time';
import { Goal } from './goal';
import { Stats } from './stats';
import { Card } from './card';
import { TimeLineItem } from './time-line-item';

export class Game {
  id: number;
  gameTime: GameTime;
  goals: Goal[];
  stats: Stats;
  cards: Card[];
  timeLineItems: TimeLineItem[];
}
