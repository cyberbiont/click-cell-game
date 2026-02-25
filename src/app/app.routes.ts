import { Routes } from '@angular/router';
import { GAME_CONFIG } from './features/game/game.config';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/game/pages/game/game'),
    providers: [
      {
        provide: GAME_CONFIG,
        useValue: {
          gridSize: 10,
          defaultTimeLimitMs: 1000,
          winningScore: 10
        }
      }
    ]
  }
];
