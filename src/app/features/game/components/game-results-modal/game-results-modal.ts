import { Component, inject } from '@angular/core';

import { GameService } from '../../services/game.service';
import { ModalWrapper } from '@shared/components/modal-wrapper/modal-wrapper';
import { Side } from '../../game.models';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-game-results-modal',
  imports: [ModalWrapper, TitleCasePipe],
  templateUrl: './game-results-modal.html',
  styleUrl: './game-results-modal.css',
})
export class GameResultsModal {
  private readonly gameService = inject(GameService);

  protected readonly Side = Side;

  protected readonly winner = this.gameService.winner;
  protected readonly score = this.gameService.score;

  handleCloseRequest() {
    this.gameService.closeModal();
  }
}
