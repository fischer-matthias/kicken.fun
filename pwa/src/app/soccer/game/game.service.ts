import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  private id: number;

  construtor() {}

  public generateGame(): number {
    return this.id = Date.now();
  }

  public setId(id: number): void {
    this.id = id;
    this.loadGameInformations();
  }

  private loadGameInformations(): void {
    // load times, cards, goals by id
  }
}
