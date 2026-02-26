export enum Side {
  PLAYER = 'player',
  COMPUTER = 'computer',
}

export enum GameCellStatus {
  UNTOUCHED = 'untouched',
  ACTIVE = 'active',
  PLAYER = 'player',
  COMPUTER = 'computer',
}

export interface GameCellModel {
  id: number;
  status: GameCellStatus;
}
