import { Component, input, output } from '@angular/core';

import { GameCellModel } from '../../game.models';

/* this component is designed to be dumb */
@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.html',
  styleUrl: './game-cell.css',
})
export class GameCell {
  cell = input.required<GameCellModel>();
  isDisabled = input.required<boolean>();
  cellClicked = output<GameCellModel>();

  onClick() {
    this.cellClicked.emit(this.cell());
  }
}
