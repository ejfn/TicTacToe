export type Player = 'X' | 'O';
export type CellValue = Player | 'DRAW' | null;
export type Board = CellValue[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: CellValue;
  gameOver: boolean;
}
