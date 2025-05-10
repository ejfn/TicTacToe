import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Board from '../components/Board';
import { GameState, Player } from '../types/game';
import { createEmptyBoard, checkWinner, makeMove, switchPlayer } from '../utils/gameLogic';
import { useTheme, themeColors } from '../context/ThemeContext';
import {
  scoreItemStyles,
  shadowStyles,
  opacityStyles,
  buttonStyles,
} from '../styles/GameScreenStyles';

const GameScreen: React.FC = () => {
  const { colors, toggleTheme, theme } = useTheme();

  // Track the current starting player ('X' for first game, then alternates)
  const [lastStartingPlayer, setLastStartingPlayer] = useState<Player>('O');

  // Set the initial player for the very first game
  const initialPlayer: Player = 'X';

  // Add win counts for each player
  const [winCounts, setWinCounts] = useState({
    X: 0,
    O: 0,
    draws: 0,
  });

  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: initialPlayer, // First game starts with X
    winner: null,
    gameOver: false,
  });

  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const themeButtonScaleAnim = useRef(new Animated.Value(1)).current;

  const handleCellPress = (index: number) => {
    if (gameState.gameOver || gameState.board[index] !== null) {
      return;
    }

    const newBoard = makeMove(gameState.board, index, gameState.currentPlayer);
    const winner = checkWinner(newBoard);

    // Update win counts when game is over
    if (winner) {
      setWinCounts(prevCounts => {
        const newCounts = { ...prevCounts };

        if (winner === 'DRAW') {
          newCounts.draws += 1;
        } else {
          newCounts[winner] += 1;
        }

        return newCounts;
      });
    }

    setGameState({
      board: newBoard,
      currentPlayer: switchPlayer(gameState.currentPlayer),
      winner: winner,
      gameOver: winner !== null,
    });
  };

  // Ensure initial state is consistent
  React.useEffect(() => {
    // Make sure lastStartingPlayer is properly set based on initialPlayer
    setLastStartingPlayer(initialPlayer);
  }, []);

  // Helper function for button press animations
  const animateButtonPress = (animValue: Animated.Value, scale = 0.9) => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: scale,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animValue, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetGame = () => {
    // Animate button press
    animateButtonPress(buttonScaleAnim);

    // Switch the starting player for the next game
    const nextStartingPlayer = switchPlayer(lastStartingPlayer);
    setLastStartingPlayer(nextStartingPlayer);

    setGameState({
      board: createEmptyBoard(),
      currentPlayer: nextStartingPlayer,
      winner: null,
      gameOver: false,
    });
  };

  const handleThemeToggle = () => {
    // Animate button press
    animateButtonPress(themeButtonScaleAnim, 0.8);

    // Toggle theme
    toggleTheme();
  };

  const renderStatus = () => {
    if (gameState.winner === 'DRAW') {
      return (
        <View
          style={[
            styles.statusCard,
            shadowStyles.transparentBg,
            {
              borderColor: colors.drawText,
              backgroundColor: colors.boardBackground,
            },
          ]}
        >
          <View style={[styles.statusIconContainer, { backgroundColor: colors.drawText }]}>
            <Text style={styles.statusIcon}>🤝</Text>
          </View>
          <Text style={[styles.status, { color: colors.drawText }]}>Game ended in a draw!</Text>
        </View>
      );
    } else if (gameState.winner) {
      const isXWinner = gameState.winner === 'X';
      return (
        <View
          style={[
            styles.statusCard,
            shadowStyles.transparentBg,
            {
              borderColor: isXWinner ? colors.xText : colors.oText,
              backgroundColor: colors.boardBackground,
            },
          ]}
        >
          <View
            style={[
              styles.statusIconContainer,
              { backgroundColor: isXWinner ? colors.xText : colors.oText },
            ]}
          >
            <Text style={styles.statusIcon}>{isXWinner ? '🎉' : '🎊'}</Text>
          </View>
          <View style={styles.winnerTextContainer}>
            <Text style={styles.winnerLabel}>Winner</Text>
            <Text style={[styles.winnerPlayer, { color: isXWinner ? colors.xText : colors.oText }]}>
              Player {gameState.winner}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.turnContainer, { backgroundColor: colors.boardBackground }]}>
          <View style={styles.turnInfo}>
            <Text style={[styles.turnLabel, { color: colors.turnLabelText }]}>Current Turn</Text>
            <View style={[
              styles.turnPlayerContainer,
              {
                backgroundColor:
                  gameState.currentPlayer === 'X'
                    ? colors.xTurnBackground
                    : colors.oTurnBackground,
              },
            ]}>
              <Text
                style={[
                  styles.turnPlayer,
                  {
                    color: gameState.currentPlayer === 'X' ? colors.xText : colors.oText,
                  },
                ]}
              >
                {gameState.currentPlayer}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };

  // Render player score counter
  const renderScoreItem = (player: 'X' | 'O' | 'DRAW', count: number) => {
    const isDrawItem = player === 'DRAW';
    const bgColor = isDrawItem
      ? colors.drawText
      : player === 'X'
        ? colors.xTurnBackground
        : colors.oTurnBackground;
    const textColor = isDrawItem ? colors.drawText : player === 'X' ? colors.xText : colors.oText;

    return (
      <View style={styles.scoreItem}>
        <View
          style={[
            styles.playerBadge,
            {
              backgroundColor: bgColor,
            },
            isDrawItem ? opacityStyles.faded : opacityStyles.normal,
          ]}
        >
          <Text style={[styles.playerLabel, { color: textColor }]}>
            {isDrawItem ? 'D' : player}
          </Text>
        </View>
        <Text style={[styles.scoreValue, { color: colors.text }]}>{count}</Text>
      </View>
    );
  };

  // Render the complete scoreboard
  const renderScoreboard = () => {
    return (
      <View
        style={[
          styles.scoreboardContainer,
          {
            backgroundColor: colors.boardBackground,
            borderColor: colors.cellBorder,
            shadowColor: colors.shadowColor,
          },
        ]}
      >
        {renderScoreItem('X', winCounts.X)}
        {renderScoreItem('DRAW', winCounts.draws)}
        {renderScoreItem('O', winCounts.O)}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={scoreItemStyles.flexContainer} />
        <Text
          style={[
            styles.title,
            shadowStyles.textShadow,
            {
              color: colors.text,
              textShadowColor: colors.shadowColor,
            },
          ]}
        >
          Tic Tac Toe
        </Text>
        <View style={scoreItemStyles.flexEnd}>
          <Animated.View style={{ transform: [{ scale: themeButtonScaleAnim }] }}>
            <TouchableOpacity
              style={[
                styles.themeButton,
                {
                  backgroundColor:
                    theme === 'dark' ? themeColors.darkButton : themeColors.lightButton,
                  shadowColor: colors.shadowColor,
                },
              ]}
              onPress={handleThemeToggle}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.themeButtonText,
                  { color: theme === 'dark' ? themeColors.darkSun : themeColors.lightMoon },
                ]}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {renderScoreboard()}
      {renderStatus()}

      <Board board={gameState.board} onCellPress={handleCellPress} gameOver={gameState.gameOver} />

      <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            buttonStyles.blueButton,
            {
              backgroundColor: colors.buttonBackground,
              shadowColor: colors.buttonShadow,
            },
          ]}
          onPress={resetGame}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, buttonStyles.buttonText, { color: colors.buttonText }]}>
            Reset Game
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scoreboardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    // shadowColor applied via inline styles
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scoreItem: {
    alignItems: 'center',
    marginHorizontal: 15,
    minWidth: 40,
  },
  playerBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 1,
    // textShadowColor applied via inline style
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  themeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow properties from shadowStyles
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  themeButtonText: {
    fontSize: 18,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    // Using transparentBg from shadowStyles
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    // Shadow properties from shadowStyles
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    minWidth: 250,
    justifyContent: 'flex-start',
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusIcon: {
    fontSize: 20,
  },
  status: {
    fontSize: 18,
    fontWeight: '600',
  },
  winnerTextContainer: {
    flexDirection: 'column',
  },
  winnerLabel: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 2,
  },
  winnerPlayer: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  turnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 20,
    // Shadow properties from shadowStyles
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minWidth: 180,
  },
  turnInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  turnLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  turnPlayerContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow properties from shadowStyles
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  turnPlayer: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    // backgroundColor applied via inline style
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 35,
    // Shadow properties from shadowStyles and buttonStyles
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    // color applied via inline style
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default GameScreen;
