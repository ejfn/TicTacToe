import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';
import { Board as BoardType } from '../types/game';
import { useTheme } from '../context/ThemeContext';

interface BoardProps {
  board: BoardType;
  onCellPress: (index: number) => void;
  gameOver: boolean;
}

const Board: React.FC<BoardProps> = ({ board, onCellPress, gameOver }) => {
  const { colors } = useTheme();

  // Get shadow color for board
  const boardShadowColor = colors.shadowColor;

  // Create rows for better grid alignment
  const rows = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
  ];

  return (
    <View
      style={[
        styles.board,
        {
          backgroundColor: colors.boardBackground,
          shadowColor: boardShadowColor,
        },
      ]}
    >
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map(index => (
            <Cell
              key={index}
              value={board[index]}
              onPress={() => onCellPress(index)}
              disabled={gameOver}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: 320,
    height: 320,
    flexDirection: 'column',
    borderRadius: 16,
    padding: 6, // Slightly more padding for consistent spacing
    // Shadow color is applied dynamically
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    height: 102, // Match the cell height + margins (98 + 4)
    justifyContent: 'space-between',
    paddingVertical: 0,
  },
});

export default Board;
