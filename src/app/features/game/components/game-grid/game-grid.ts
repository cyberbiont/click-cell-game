import { Component, inject } from '@angular/core';

import { GameCell } from '../game-cell/game-cell';
import { GameCellModel } from '../../game.models';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-grid',
  imports: [GameCell],
  templateUrl: './game-grid.html',
  styleUrl: './game-grid.css',
  host: {
    'role': 'grid',
    'aria-label': 'Game board'
  }
})
export class GameGrid {
  private readonly gameService = inject(GameService);

  protected readonly cells = this.gameService.cells;
  protected readonly isGameRoundActive = this.gameService.isGameRoundActive;

  protected handleCellClick(cell: GameCellModel) {
    this.gameService.handleCellClick(cell);
  }
}
