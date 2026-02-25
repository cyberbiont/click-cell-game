import { Component, inject } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-results-modal',
  templateUrl: './game-results-modal.html',
  styleUrl: './game-results-modal.css',
})
export class GameResultsModal {
  private readonly gameService = inject(GameService);

  protected readonly isVisible = this.gameService.isModalVisible;
  protected readonly winner = this.gameService.winner;
  protected readonly score = this.gameService.score;

  onClose() {
    this.gameService.closeModal();
  }
}
