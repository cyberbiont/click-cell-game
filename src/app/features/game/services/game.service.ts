import { GameCell, GameCellStatus, Side } from '../game.models';
import { Injectable, inject, signal } from '@angular/core';

import { GAME_CONFIG } from '../game.config';
import { getRandomArrayElement } from '@core/utils/helpers';

@Injectable()
export class GameService {
  private readonly cfg = inject(GAME_CONFIG);

  readonly cells = signal<GameCell[]>(this.initializeCells());

  readonly score = {
    player: signal(0),
    computer: signal(0),
  } as const;

  readonly timeLimit = signal(this.cfg.defaultTimeLimitMs);

  readonly isGameActive = signal(false);
  readonly isModalVisible = signal(false);
  readonly winner = signal<Side | ''>('');

  private currentCell = -1;
  private timer: any;
  

  startGame(timeLimit: number) {
    this.timeLimit.set(timeLimit);
    this.resetGame();
    this.isGameActive.set(true);
    this.highlightRandomCell();
  }

  handleCellClick(cell: GameCell) {
    if (cell.status !== GameCellStatus.ACTIVE) return;

    clearTimeout(this.timer);
    const newCells = [...this.cells()];
    newCells[cell.id] = { ...newCells[cell.id], status: GameCellStatus.PLAYER };
    this.cells.set(newCells);
    this.score.player.update((s) => s + 1);

    if (this.score.player() === this.cfg.winningScore) {
      this.endGame(Side.PLAYER);
    } else {
      this.highlightRandomCell();
    }
  }

  closeModal() {
    this.isModalVisible.set(false);
  }

  private resetGame() {
    this.cells.set(this.initializeCells());
    this.score.player.set(0);
    this.score.computer.set(0);
    this.isModalVisible.set(false);
  }

  private initializeCells(): GameCell[] {
    return Array.from({ length: this.cfg.gridSize * this.cfg.gridSize }, (_, id) => ({
      id,
      status: GameCellStatus.UNTOUCHED,
    }));
  }

  private highlightRandomCell() {
    if (!this.isGameActive()) return;

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
      this.endGame(Side.COMPUTER);
    } else {
      this.highlightRandomCell();
    }
  }

  private endGame(winner: Side) {
    this.isGameActive.set(false);
    this.winner.set(winner);
    this.isModalVisible.set(true);
    clearTimeout(this.timer);
  }
}
