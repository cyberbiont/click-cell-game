import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Side } from '../../game.models';

@Component({
  selector: 'app-game-score',
  imports: [TitleCasePipe],
  templateUrl: './game-score.html',
  styleUrl: './game-score.css',
})
export class GameScore {
  side = input.required<Side>();
  score = input.required<number>();
}
