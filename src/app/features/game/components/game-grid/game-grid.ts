import { Component, input, output } from '@angular/core';
import type { CellState } from '../../pages/game/game';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.html',
  styleUrl: './game-grid.css'
})
export class GameGrid {
  cells = input.required<CellState[]>();
  cellClick = output<number>();

  onCellClick(index: number) {
    this.cellClick.emit(index);
  }
}
