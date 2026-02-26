import { Component, inject } from '@angular/core';

import { GameControls } from '../../components/game-controls/game-controls';
import { GameGrid } from '../../components/game-grid/game-grid';
import { GameResultModal } from '../../components/game-result-modal/game-result-modal';
import { GameScore } from '../../components/game-score/game-score';
import { GameService } from '../../services/game.service';
import { Side } from '../../game.models';

@Component({
  selector: 'app-game',
  imports: [GameControls, GameGrid, GameResultModal, GameScore],
  providers: [GameService],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export default class Game {
  private readonly gameService = inject(GameService);

  protected readonly Side = Side;
  protected readonly score = this.gameService.score;
  protected readonly isModalVisible = this.gameService.isModalVisible;
  protected readonly lastRoundResult = this.gameService.currentRoundResult;
}
