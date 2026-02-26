import { Component, computed, input, output } from '@angular/core';
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

    switch (status) {
      case GameCellStatus.PLAYER:
        return `Cell ${id}, claimed by ${Side.PLAYER}`;
      case GameCellStatus.COMPUTER:
        return `Cell ${id}, claimed by ${Side.COMPUTER}`;
      case GameCellStatus.ACTIVE:
        return `Cell ${id}, active target, click before iime is out to score`;
      default:
        return `Cell ${id}`;
    }
  });

  protected onClick() {
    this.cellClicked.emit(this.cell());
  }
}
