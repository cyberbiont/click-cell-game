import { Routes } from '@angular/router';
import { provideGameConfig } from './features/game/game.config';

export default [
  {
    path: '',
    loadComponent: () => import('./features/game/pages/game/game'),
    providers: [
      provideGameConfig({
        gridSize: 10,
        defaultTimeLimitMs: 1000,
        minTimeLimitMs: 100,
        maxTimeLimitMs: 2000,
        winningScore: 10,
      }),
    ],
  },
] satisfies Routes;
