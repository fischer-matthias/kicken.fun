import { Team } from './team';
import { GameStatus } from './game-status';
import { GameTime } from './game-time';
import { Goal } from './goal';
import { Stats } from './stats';
import { Card } from './card';
import { TimeLineItem } from './time-line-item';

export class Game {
  id: string;
  teamId: string;
  team: Team;
  gameTime: GameTime;
  gameStatus: GameStatus;
  goals: Goal[];
  stats: Stats;
  cards: Card[];
  timeLineItems: TimeLineItem[];
}
