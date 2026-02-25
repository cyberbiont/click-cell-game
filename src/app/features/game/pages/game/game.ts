import { Component } from '@angular/core';
import { GameControls } from '../../components/game-controls/game-controls';
import { GameGrid } from '../../components/game-grid/game-grid';
import { GameResultsModal } from '../../components/game-results-modal/game-results-modal';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  imports: [GameControls, GameGrid, GameResultsModal],
  providers: [GameService],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export default class Game {}
