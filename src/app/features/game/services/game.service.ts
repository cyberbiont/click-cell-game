import { GAME_CONFIG, GameConfig } from '../game.config';
import { GameCellModel, GameCellStatus, Side } from '../game.models';
import { Injectable, OnDestroy, inject, isDevMode, signal } from '@angular/core';
import { getRandomArrayElement, getRandomNumber, isArrayNotEmpty } from '@core/utils/helpers';

export type GameResult = {
  winner: Side;
  score: {
    [Side.PLAYER]: number;
    [Side.COMPUTER]: number;
  };
  // can add more data here like best result (if we measure total time it took to win)
};

@Injectable()
export class GameService implements OnDestroy {
  private readonly cfg = this.validateConfig(inject(GAME_CONFIG));

  readonly cells = this.initializeCells();
  private untouchedCells = this.cloneCellsCollection(); // serves as a temporary live collection of available cells to select from

  readonly score = {
    player: signal(0),
    computer: signal(0),
  } as const;

  readonly gamesHistory: GameResult[] = []; // TODO games history can be used to calculate statistics, or calculate absolute winner based on who won 5 rounds first

  readonly timeLimit = signal(this.cfg.defaultTimeLimitMs);

  readonly isGameActive = signal(false);

  readonly isModalVisible = signal(false);
  readonly currentGameResult = signal<GameResult | null>(null);

  private activeCell: GameCellModel | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined = undefined;

  startGame(timeLimit: number) {
    this.clearTimer();
    this.timeLimit.set(timeLimit);
    this.resetGame();
    this.isGameActive.set(true);
    this.highlightRandomCell();
  }

  private getFinalScore() {
    return {
      [Side.PLAYER]: this.score.player(),
      [Side.COMPUTER]: this.score.computer(),
    };
  }

  private openModal() {
    this.isModalVisible.set(true);
  }

  closeModal() {
    this.isModalVisible.set(false);
  }

  private cloneCellsCollection() {
    return [...this.cells];
  }

  private resetGame() {
    this.clearTimer();
    this.isModalVisible.set(false);
    this.currentGameResult.set(null);
    this.cells.forEach((cell) => (cell.status = GameCellStatus.UNTOUCHED));
    this.untouchedCells = this.cloneCellsCollection();
    this.score.player.set(0);
    this.score.computer.set(0);
  }

  private initializeCells(): GameCellModel[] {
    return Array.from({ length: this.cfg.gridSize * this.cfg.gridSize }, (_, id) => ({
      id,
      status: GameCellStatus.UNTOUCHED,
    }));
  }

  private highlightRandomCell() {
    if (!this.isGameActive()) return;

    if (this.untouchedCells.length > 0) {
      const randomIndex = getRandomNumber(this.untouchedCells.length);
      this.activeCell = this.untouchedCells[randomIndex];

      {
        // remove activated element. swap and pop method reduces operation cost to O(1) and is more effective them using splice for deletion
        // we don't care about order of elements cause original cells collection is used to output the elements on page
        this.untouchedCells[randomIndex] = this.untouchedCells[this.untouchedCells.length - 1];
        this.untouchedCells.pop();
      }

      this.updateCellStatus(this.activeCell, GameCellStatus.ACTIVE);

      this.timer = setTimeout(() => this.handleTimeout(), this.timeLimit());
    }
  }

  handleCellClick(cell: GameCellModel) {
    if (!this.activeCell || cell.status !== GameCellStatus.ACTIVE) return; // wrong cell clicked
    // we can also compare directly this.activeCell === cell

    this.clearTimer();

    this.updateCellStatus(cell, GameCellStatus.PLAYER);
    this.score.player.update((s) => s + 1);

    this.checkWinCondition();
  }

  private handleTimeout() {
    if (!this.activeCell) return;

    this.updateCellStatus(this.activeCell, GameCellStatus.COMPUTER);
    this.score.computer.update((s) => s + 1);

    this.checkWinCondition();
  }

  private endGameRound(result: GameResult) {
    this.isGameActive.set(false);
    this.gamesHistory.push(result);

    this.currentGameResult.set(result);

    this.clearTimer();

    this.openModal();
  }

  private updateCellStatus(cell: GameCellModel, status: GameCellStatus) {
    cell.status = status;
  }

  private checkWinCondition() {
    if (this.score.player() === this.cfg.winningScore) {
      this.endGameRound({
        winner: Side.PLAYER,
        score: this.getFinalScore(),
      });
    } else if (this.score.computer() === this.cfg.winningScore) {
      this.endGameRound({
        winner: Side.COMPUTER,
        score: this.getFinalScore(),
      });
    } else {
      this.highlightRandomCell();
    }
  }

  /**
   * Validates and sanitizes game configuration values.
   * Ensures gridSize and winningScore are positive integers, and defaultTimeLimitMs meets minimum threshold.
   * Invalid values are replaced with safe defaults. Logs a warning in development mode when corrections are made.
   */
  private validateConfig(config: GameConfig): GameConfig {
    const gridSize =
      Number.isInteger(config.gridSize) && config.gridSize >= 1 ? config.gridSize : 10;
    const minTimeLimitMs = config.minTimeLimitMs >= 100 ? config.minTimeLimitMs : 100;
    const maxTimeLimitMs = config.maxTimeLimitMs >= minTimeLimitMs ? config.maxTimeLimitMs : 2000;
    const defaultTimeLimitMs =
      config.defaultTimeLimitMs >= minTimeLimitMs && config.defaultTimeLimitMs <= maxTimeLimitMs
        ? config.defaultTimeLimitMs
        : 1000;
    const maxScore = gridSize * gridSize;
    const winningScore =
      Number.isInteger(config.winningScore) &&
      config.winningScore >= 1 &&
      config.winningScore <= maxScore
        ? config.winningScore
        : 10;

    const validated = {
      gridSize,
      defaultTimeLimitMs,
      minTimeLimitMs,
      maxTimeLimitMs,
      winningScore,
    };

    if (
      isDevMode() &&
      (config.gridSize !== gridSize ||
        config.defaultTimeLimitMs !== defaultTimeLimitMs ||
        config.minTimeLimitMs !== minTimeLimitMs ||
        config.maxTimeLimitMs !== maxTimeLimitMs ||
        config.winningScore !== winningScore)
    ) {
      console.warn(
        '[GameConfig] Some of the provided config values were not valid and set to safe defaults:',
        { provided: config, corrected: validated },
      );
    }

    return validated;
  }

  private clearTimer(): void {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
