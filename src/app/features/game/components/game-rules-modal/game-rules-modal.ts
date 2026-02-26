import { Component, output } from '@angular/core';
import { ModalWrapper } from '@shared/components/modal-wrapper/modal-wrapper';

@Component({
  selector: 'app-game-rules-modal',
  imports: [ModalWrapper],
  templateUrl: './game-rules-modal.html',
  styleUrl: './game-rules-modal.css',
})
export class GameRulesModal {
  closeRequested = output<void>();

  protected handleCloseRequest() {
    this.closeRequested.emit();
  }
}
