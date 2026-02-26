import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-controls',
  imports: [FormsModule],
  templateUrl: './game-controls.html',
  styleUrl: './game-controls.css',
})
export class GameControls {
  private readonly gameService = inject(GameService);

  protected readonly timeLimit = signal(this.gameService.timeLimit());
  protected readonly isGameActive = this.gameService.isGameActive;

  onStart() {
    this.gameService.startGame(this.timeLimit());
  }
}
