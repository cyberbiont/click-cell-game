import { Component, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { GAME_CONFIG } from '../../game.config';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-controls',
  imports: [FormsModule],
  templateUrl: './game-controls.html',
  styleUrl: './game-controls.css',
})
export class GameControls {
  private readonly gameService = inject(GameService);
  private readonly config = inject(GAME_CONFIG);

  protected readonly timeLimit = signal(this.gameService.timeLimit());
  protected readonly isGameActive = this.gameService.isGameRoundActive;
  protected readonly minTimeout = this.config.minTimeLimitMs;
  protected readonly maxTimeout = this.config.maxTimeLimitMs;

  protected onStart() {
    const validatedTimeLimit = Math.min(Math.max(this.minTimeout, this.timeLimit()), this.maxTimeout);
    this.timeLimit.set(validatedTimeLimit);
    this.gameService.startGame(validatedTimeLimit);
  }
}
