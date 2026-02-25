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

export interface GameCell {
  id: number;
  status: GameCellStatus;
}
