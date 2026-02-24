import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type CellState = 'blue' | 'yellow' | 'green' | 'red';

@Component({
  selector: 'app-mini-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mini-game.component.html',
  styleUrl: './mini-game.component.scss'
})
export class MiniGameComponent {
  cells = signal<CellState[]>(Array(100).fill('blue'));
  playerScore = signal(0);
  computerScore = signal(0);
  timeLimit = signal(1000);
  gameActive = signal(false);
  showModal = signal(false);
  winner = signal('');
  
  private currentCell = -1;
  private timer: any;

  startGame() {
    if (this.timeLimit() < 100) return;
    
    this.cells.set(Array(100).fill('blue'));
    this.playerScore.set(0);
    this.computerScore.set(0);
    this.gameActive.set(true);
    this.showModal.set(false);
    this.highlightRandomCell();
  }

  private highlightRandomCell() {
    if (!this.gameActive()) return;

    const availableCells = this.cells()
      .map((state, idx) => state === 'blue' ? idx : -1)
      .filter(idx => idx !== -1);

    if (availableCells.length === 0) return;

    this.currentCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    const newCells = [...this.cells()];
    newCells[this.currentCell] = 'yellow';
    this.cells.set(newCells);

    this.timer = setTimeout(() => {
      this.handleTimeout();
    }, this.timeLimit());
  }

  onCellClick(index: number) {
    if (!this.gameActive() || this.cells()[index] !== 'yellow') return;

    clearTimeout(this.timer);
    const newCells = [...this.cells()];
    newCells[index] = 'green';
    this.cells.set(newCells);
    this.playerScore.update(s => s + 1);

    if (this.playerScore() === 10) {
      this.endGame('Player');
    } else {
      this.highlightRandomCell();
    }
  }

  private handleTimeout() {
    if (this.currentCell === -1) return;

    const newCells = [...this.cells()];
    newCells[this.currentCell] = 'red';
    this.cells.set(newCells);
    this.computerScore.update(s => s + 1);

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

  closeModal() {
    this.showModal.set(false);
  }
}
