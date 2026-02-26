import { Component, input, output, computed } from '@angular/core';
import { GameCellModel, GameCellStatus, Side } from '../../game.models';

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

  protected ariaLabel = computed(() => {
    const { status, id } = this.cell();
    if (status === GameCellStatus.PLAYER) return `Cell ${id}, claimed by ${Side.PLAYER}`;
    if (status === GameCellStatus.COMPUTER) return `Cell ${id}, claimed by ${Side.COMPUTER}`;
    if (status === GameCellStatus.ACTIVE) return `Cell ${id}, active target`;
    return `Cell ${id}, click to claim`;
  });

  onClick() {
    this.cellClicked.emit(this.cell());
  }
}
