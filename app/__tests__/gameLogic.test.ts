import { createEmptyBoard, checkWinner, makeMove, switchPlayer } from '../utils/gameLogic';

describe('Game Logic', () => {
  describe('createEmptyBoard', () => {
    it('should create an empty board with 9 null cells', () => {
      const board = createEmptyBoard();
      expect(board).toHaveLength(9);
      expect(board.every(cell => cell === null)).toBe(true);
    });
  });

  describe('checkWinner', () => {
    it('should return null when there is no winner', () => {
      const board = createEmptyBoard();
      expect(checkWinner(board)).toBeNull();
    });

    it('should detect a winner in a row', () => {
      const board = [
        'X' as const,
        'X' as const,
        'X' as const,
        null,
        'O' as const,
        'O' as const,
        null,
        null,
        null,
      ];
      expect(checkWinner(board)).toBe('X');
    });

    it('should detect a winner in a column', () => {
      const board = [
        'O' as const,
        'X' as const,
        null,
        'O' as const,
        'X' as const,
        null,
        'O' as const,
        null,
        null,
      ];
      expect(checkWinner(board)).toBe('O');
    });

    it('should detect a winner in a diagonal', () => {
      const board = [
        'X' as const,
        'O' as const,
        'O' as const,
        null,
        'X' as const,
        null,
        'O' as const,
        null,
        'X' as const,
      ];
      expect(checkWinner(board)).toBe('X');
    });

    it('should detect a draw', () => {
      const board = [
        'X' as const,
        'O' as const,
        'X' as const,
        'X' as const,
        'O' as const,
        'X' as const,
        'O' as const,
        'X' as const,
        'O' as const,
      ];
      expect(checkWinner(board)).toBe('DRAW');
    });
  });

  describe('makeMove', () => {
    it('should make a move on an empty cell', () => {
      const board = createEmptyBoard();
      const newBoard = makeMove(board, 4, 'X');
      expect(newBoard[4]).toBe('X');
    });

    it('should not make a move on an occupied cell', () => {
      const board = createEmptyBoard();
      const boardWithX = makeMove(board, 4, 'X');
      const boardAfterAttempt = makeMove(boardWithX, 4, 'O');
      expect(boardAfterAttempt[4]).toBe('X');
    });
  });

  describe('switchPlayer', () => {
    it('should switch from X to O', () => {
      expect(switchPlayer('X')).toBe('O');
    });

    it('should switch from O to X', () => {
      expect(switchPlayer('O')).toBe('X');
    });
  });
});
