import { Component, input } from '@angular/core';

import { Side } from '../../game.models';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-game-score',
  imports: [UpperCasePipe],
  templateUrl: './game-score.html',
  styleUrl: './game-score.css',
  host: {
    '[attr.data-side]': 'side()',
    role: 'status',
    '[attr.aria-label]': 'side() + " score"',
  },
})
export class GameScore {
  side = input.required<Side>();
  score = input.required<number>();
}
