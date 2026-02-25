import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-game-results-modal',
  templateUrl: './game-results-modal.html',
  styleUrl: './game-results-modal.css'
})
export class GameResultsModal {
  show = input.required<boolean>();
  winner = input.required<string>();
  playerScore = input.required<number>();
  computerScore = input.required<number>();
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}
