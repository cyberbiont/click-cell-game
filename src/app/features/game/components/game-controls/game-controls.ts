import { Component, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Side } from '../../game.models';

@Component({
  selector: 'app-game-controls',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './game-controls.html',
  styleUrl: './game-controls.css',
})
export class GameControls {
  private readonly gameService = inject(GameService);

  protected readonly Side = Side;

  timeLimit = signal(this.gameService.timeLimit());
  isGameActive = this.gameService.isGameActive;
  score = this.gameService.score;

  onStart() {
    this.gameService.startGame(this.timeLimit());
  }
}
