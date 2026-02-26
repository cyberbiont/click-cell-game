import { Component, inject } from '@angular/core';

import { GameCell } from '../../game.models';
import { GameGridCell } from '../game-grid-cell/game-grid-cell';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-grid',
  imports: [GameGridCell],
  templateUrl: './game-grid.html',
  styleUrl: './game-grid.css',
})
export class GameGrid {
  private readonly gameService = inject(GameService);

  protected readonly cells = this.gameService.cells;
  protected readonly isGameActive = this.gameService.isGameActive;

  onCellClick(cell: GameCell) {
    this.gameService.handleCellClick(cell);
  }
}
