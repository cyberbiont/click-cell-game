import { Component, signal } from '@angular/core';

import { GameControls } from '../../components/game-controls/game-controls';
import { GameGrid } from '../../components/game-grid/game-grid';
import { GameResultsModal } from '../../components/game-results-modal/game-results-modal';

export type CellState = 'blue' | 'yellow' | 'green' | 'red';

@Component({
  selector: 'app-game',
  imports: [GameControls, GameGrid, GameResultsModal],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export default class Game {
  cells = signal<CellState[]>(Array(100).fill('blue'));
  playerScore = signal(0);
  computerScore = signal(0);
  timeLimit = signal(1000);
  gameActive = signal(false);
  showModal = signal(false);
  winner = signal('');

  private currentCell = -1;
  private timer: any;

  onStart(timeLimit: number) {
    this.timeLimit.set(timeLimit);
    this.cells.set(Array(100).fill('blue'));
    this.playerScore.set(0);
    this.computerScore.set(0);
    this.gameActive.set(true);
    this.showModal.set(false);
    this.highlightRandomCell();
  }

  onCellClick(index: number) {
    if (!this.gameActive() || this.cells()[index] !== 'yellow') return;

    clearTimeout(this.timer);
    const newCells = [...this.cells()];
    newCells[index] = 'green';
    this.cells.set(newCells);
    this.playerScore.update((s) => s + 1);

    if (this.playerScore() === 10) {
      this.endGame('Player');
    } else {
      this.highlightRandomCell();
    }
  }

  onCloseModal() {
    this.showModal.set(false);
  }

  private highlightRandomCell() {
    if (!this.gameActive()) return;

    const availableCells = this.cells()
      .map((state, idx) => (state === 'blue' ? idx : -1))
      .filter((idx) => idx !== -1);

    if (availableCells.length === 0) return;

    this.currentCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    const newCells = [...this.cells()];
    newCells[this.currentCell] = 'yellow';
    this.cells.set(newCells);

    this.timer = setTimeout(() => this.handleTimeout(), this.timeLimit());
  }

  private handleTimeout() {
    if (this.currentCell === -1) return;

    const newCells = [...this.cells()];
    newCells[this.currentCell] = 'red';
    this.cells.set(newCells);
    this.computerScore.update((s) => s + 1);

    if (this.computerScore() === 10) {
      this.endGame('Computer');
    } else {
      this.highlightRandomCell();
    }
  }

  private endGame(winner: string) {
    this.gameActive.set(false);
    this.winner.set(winner);
    this.showModal.set(true);
    clearTimeout(this.timer);
  }
}
