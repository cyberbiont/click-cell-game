import { InjectionToken, isDevMode } from '@angular/core';

export interface GameConfig {
  gridSize: number;
  defaultTimeLimitMs: number;
  winningScore: number;
}

export const GAME_CONFIG = new InjectionToken<GameConfig>('GAME_CONFIG');

export function provideGameConfig(config: GameConfig) {
  const gridSize = Math.max(1, Math.floor(config.gridSize)) || 5;
  const defaultTimeLimitMs = Math.max(100, config.defaultTimeLimitMs) || 1000;
  const maxScore = gridSize * gridSize;
  const winningScore = Math.min(Math.max(1, config.winningScore), maxScore) || 10;

  const validated: GameConfig = { gridSize, defaultTimeLimitMs, winningScore };

  if (isDevMode() && JSON.stringify(config) !== JSON.stringify(validated)) {
    console.warn('[GameConfig] Invalid config corrected:', { provided: config, corrected: validated });
  }

  return { provide: GAME_CONFIG, useValue: validated };
}
