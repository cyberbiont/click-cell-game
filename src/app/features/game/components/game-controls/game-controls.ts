import { Component, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { GAME_CONFIG } from '../../game.config';
import { GameRulesModal } from '../game-rules-modal/game-rules-modal';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-controls',
  imports: [FormsModule, GameRulesModal],
  templateUrl: './game-controls.html',
  styleUrl: './game-controls.css',
})
export class GameControls {
  private readonly gameService = inject(GameService);
  private readonly config = inject(GAME_CONFIG);

  protected readonly timeLimit = signal(this.gameService.timeLimit());
  protected readonly isGameActive = this.gameService.isGameActive;
  protected readonly minTimeout = this.config.minTimeLimitMs;
  protected readonly maxTimeout = this.config.maxTimeLimitMs;
  protected readonly showRules = signal(false);

  protected onStart() {
    this.gameService.startGame(this.timeLimit());
  }

  protected openRules() {
    this.showRules.set(true);
  }

  protected closeRules() {
    this.showRules.set(false);
  }
}
