import { GameCellModel, GameCellStatus, Side } from '../game.models';
import { Injectable, inject, signal } from '@angular/core';

import { GAME_CONFIG } from '../game.config';
import { getRandomArrayElement } from '@core/utils/helpers';

export type GameRoundResult = {
  winner: Side;
  score: {
    [Side.PLAYER]: number;
    [Side.COMPUTER]: number;
  };
  // can add more data here like best result (if we measure total time it took to win)
};

@Injectable()
export class GameService {
  private readonly cfg = inject(GAME_CONFIG);

  readonly cells = this.initializeCells();

  readonly score = {
    player: signal(0),
    computer: signal(0),
  } as const;

  readonly gameRoundsHistory: GameRoundResult[] = []; // TODO game rounds history can be used to calculate statistics, or calculate absolute winner based on who won 5 rounds first

  readonly timeLimit = signal(this.cfg.defaultTimeLimitMs);

  readonly isGameRoundActive = signal(false);

  readonly isModalVisible = signal(false);
  readonly currentRoundResult = signal<GameRoundResult | null>(null);

  private activeCell: GameCellModel | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined = undefined;

  startGame(timeLimit: number) {
    this.timeLimit.set(timeLimit);
    this.resetGame();
    this.isGameRoundActive.set(true);
    this.highlightRandomCell();
  }

  private getFinalScore() {
    return {
      [Side.PLAYER]: this.score.player(),
      [Side.COMPUTER]: this.score.computer(),
    };
  }

  private openModal() {
    this.isModalVisible.set(true);
  }

  closeModal() {
    this.isModalVisible.set(false);
  }

  private resetGame() {
    this.isModalVisible.set(false);
    this.currentRoundResult.set(null);
    this.cells.forEach((cell) => (cell.status = GameCellStatus.UNTOUCHED));
    this.score.player.set(0);
    this.score.computer.set(0);
  }

  private initializeCells(): GameCellModel[] {
    return Array.from({ length: this.cfg.gridSize * this.cfg.gridSize }, (_, id) => ({
      id,
      status: GameCellStatus.UNTOUCHED,
    }));
  }

  private highlightRandomCell() {
    if (!this.isGameRoundActive()) return;

    const availableCells = this.cells.filter((cell) => cell.status === GameCellStatus.UNTOUCHED);

    if (availableCells.length === 0) return;

    this.activeCell = getRandomArrayElement(availableCells);
    this.updateCellStatus(this.activeCell, GameCellStatus.ACTIVE);

    this.timer = setTimeout(() => this.handleTimeout(), this.timeLimit());
  }

  handleCellClick(cell: GameCellModel) {
    if (!this.activeCell || cell.status !== GameCellStatus.ACTIVE) return; // wrong cell clicked
    // we can also compare directly this.activeCell === cell

    clearTimeout(this.timer);

    this.updateCellStatus(cell, GameCellStatus.PLAYER);
    this.score.player.update((s) => s + 1);

    this.checkWinCondition();
  }

  private handleTimeout() {
    if (!this.activeCell) return;

    this.updateCellStatus(this.activeCell, GameCellStatus.COMPUTER);
    this.score.computer.update((s) => s + 1);

    this.checkWinCondition();
  }

  private endGameRound(result: GameRoundResult) {
    this.isGameRoundActive.set(false);
    this.gameRoundsHistory.push(result);

    this.currentRoundResult.set(result);

    clearTimeout(this.timer);

    this.openModal();
  }

  private updateCellStatus(cell: GameCellModel, status: GameCellStatus) {
    cell.status = status;
  }

  private checkWinCondition() {
    if (this.score.player() === this.cfg.winningScore) {
      this.endGameRound({
        winner: Side.PLAYER,
        score: this.getFinalScore(),
      });
    } else if (this.score.computer() === this.cfg.winningScore) {
      this.endGameRound({
        winner: Side.COMPUTER,
        score: this.getFinalScore(),
      });
    } else {
      this.highlightRandomCell();
    }
  }
}
