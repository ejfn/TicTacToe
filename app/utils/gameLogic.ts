import { Board, CellValue, Player } from '../types/game';

const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

export const createEmptyBoard = (): Board => Array(9).fill(null);

export const checkWinner = (board: Board): CellValue => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Check for draw
  if (board.every(cell => cell !== null)) {
    return 'DRAW';
  }

  return null;
};

export const makeMove = (board: Board, index: number, player: Player): Board => {
  if (board[index] !== null) {
    return board; // Cell already occupied
  }

  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};

export const switchPlayer = (player: Player): Player => {
  return player === 'X' ? 'O' : 'X';
};
