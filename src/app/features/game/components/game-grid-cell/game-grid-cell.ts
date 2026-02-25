import { Component, input, output } from '@angular/core';

import { GameCell } from '../../game.models';

/* this component is designed to be dumb */
@Component({
  selector: 'app-game-grid-cell',
  templateUrl: './game-grid-cell.html',
  styleUrl: './game-grid-cell.css',
})
export class GameGridCell {
  cell = input.required<GameCell>();
  isDisabled = input.required<boolean>();
  cellClicked = output<GameCell>();

  onClick() {
    this.cellClicked.emit(this.cell());
  }
}
