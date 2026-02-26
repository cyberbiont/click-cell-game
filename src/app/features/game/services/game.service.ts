import { GameCell, GameCellStatus, Side } from '../game.models';
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

  readonly cells = signal<GameCell[]>(this.initializeCells());

  readonly score = {
    player: signal(0),
    computer: signal(0),
  } as const;

  readonly gameRoundsHistory: GameRoundResult[] = []; // TODO game rounds history can be used to calculate statistics, or calculate absolute winner based on who won 5 rounds first

  readonly timeLimit = signal(this.cfg.defaultTimeLimitMs);

  readonly isGameRoundActive = signal(false);

  readonly isModalVisible = signal(false);
  readonly lastRoundResult = signal<GameRoundResult | null>(null);

  private currentCell = -1;
  private timer: any;

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

  handleCellClick(cell: GameCell) {
    if (cell.status !== GameCellStatus.ACTIVE) return;

    clearTimeout(this.timer);
    const newCells = [...this.cells()];
    newCells[cell.id] = { ...newCells[cell.id], status: GameCellStatus.PLAYER };
    this.cells.set(newCells);
    this.score.player.update((s) => s + 1);

    if (this.score.player() === this.cfg.winningScore) {
      this.endGame({
        winner: Side.PLAYER,
        score: this.getFinalScore(),
      });
    } else {
      this.highlightRandomCell();
    }
  }

  openModal() {
    this.isModalVisible.set(true);
  }

  closeModal() {
    this.isModalVisible.set(false);
  }

  private resetGame() {
    this.isModalVisible.set(false);
    this.cells.set(this.initializeCells());
    this.score.player.set(0);
    this.score.computer.set(0);
  }

  private initializeCells(): GameCell[] {
    return Array.from({ length: this.cfg.gridSize * this.cfg.gridSize }, (_, id) => ({
      id,
      status: GameCellStatus.UNTOUCHED,
    }));
  }

  private highlightRandomCell() {
    if (!this.isGameRoundActive()) return;

    const availableCells = this.cells()
      .map((cell, idx) => (cell.status === GameCellStatus.UNTOUCHED ? idx : -1))
      .filter((idx) => idx !== -1);

    if (availableCells.length === 0) return;

    this.currentCell = getRandomArrayElement(availableCells);
    const newCells = [...this.cells()];
    newCells[this.currentCell] = { ...newCells[this.currentCell], status: GameCellStatus.ACTIVE };
    this.cells.set(newCells);

    this.timer = setTimeout(() => this.handleTimeout(), this.timeLimit());
  }

  private handleTimeout() {
    if (this.currentCell === -1) return;

    const newCells = [...this.cells()];
    newCells[this.currentCell] = { ...newCells[this.currentCell], status: GameCellStatus.COMPUTER };
    this.cells.set(newCells);
    this.score.computer.update((s) => s + 1);

    if (this.score.computer() === this.cfg.winningScore) {
      this.endGame({
        winner: Side.COMPUTER,
        score: this.getFinalScore(),
      });
    } else {
      this.highlightRandomCell();
    }
  }

  private endGame(result: GameRoundResult) {
    this.isGameRoundActive.set(false);
    this.gameRoundsHistory.push(result);

    this.lastRoundResult.set(result);
    this.openModal();
    clearTimeout(this.timer);
  }
}
