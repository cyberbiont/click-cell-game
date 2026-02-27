import { Component, inject, input } from '@angular/core';
import { GameResult, GameService } from '../../services/game.service';

import { ModalWrapper } from '@shared/components/modal-wrapper/modal-wrapper';
import { Side } from '../../game.models';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-game-result-modal',
  imports: [ModalWrapper, TitleCasePipe],
  templateUrl: './game-result-modal.html',
  styleUrl: './game-result-modal.css',
  host: {
    '[attr.data-winner]': 'result().winner',
  },
})
export class GameResultModal {
  private readonly gameService = inject(GameService);

  protected readonly Side = Side;

  result = input.required<GameResult>();

  protected handleCloseRequest() {
    this.gameService.closeModal();
  }
}
