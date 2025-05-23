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
          borderColor: colors.cellBorder,
        },
      ]}
    >
      {/* Board content with subtle border */}
      <View style={styles.boardInner}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: 300, // Reduced from 330
    height: 300, // Reduced from 330
    flexDirection: 'column',
    borderRadius: 20,
    borderWidth: 1,
    // Shadow color is applied dynamically
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
    margin: 5, // Reduced from 10
    padding: 3,
  },
  boardInner: {
    flex: 1,
    borderRadius: 16,
    padding: 4,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    height: 96, // Reduced to match the new cell height + margins
    justifyContent: 'space-between',
    paddingVertical: 0,
  },
});

export default Board;
