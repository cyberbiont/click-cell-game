import { InjectionToken } from '@angular/core';

export interface GameConfig {
  gridSize: number;
  defaultTimeLimitMs: number;
  winningScore: number;
}

export const GAME_CONFIG = new InjectionToken<GameConfig>('GAME_CONFIG');
