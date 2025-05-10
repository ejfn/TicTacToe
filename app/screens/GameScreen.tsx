import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  // Define platform-specific styles
  const iosPaddingStyle = { paddingTop: 10 };
  const androidPaddingStyle = { paddingTop: insets.top + 10 };

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

    // Directly update game state without animations
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

    // Directly update game state without animations
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
    // Create content based on game state
    let statusContent;

    if (gameState.winner === 'DRAW') {
      statusContent = (
        <View
          style={[
            styles.statusCard,
            shadowStyles.transparentBg,
            {
              borderColor: colors.drawText,
              backgroundColor: colors.cardBackground, // Use cardBackground for consistency
            },
          ]}
        >
          <View style={[styles.statusIconContainer, { backgroundColor: colors.drawText }]}>
            <Text style={styles.statusIcon}>🤝</Text>
          </View>
          <View style={styles.winnerTextContainer}>
            <Text style={[styles.winnerLabel, { color: colors.turnLabelText }]}>Result</Text>
            <Text style={[styles.winnerPlayer, { color: colors.drawText }]}>Draw Game</Text>
          </View>
        </View>
      );
    } else if (gameState.winner) {
      const isXWinner = gameState.winner === 'X';
      statusContent = (
        <View
          style={[
            styles.statusCard,
            shadowStyles.transparentBg,
            {
              borderColor: isXWinner ? colors.xText : colors.oText,
              backgroundColor: colors.cardBackground, // Use cardBackground for consistency
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
            <Text style={[styles.winnerLabel, { color: colors.turnLabelText }]}>Winner</Text>
            <Text style={[styles.winnerPlayer, { color: isXWinner ? colors.xText : colors.oText }]}>
              Player {gameState.winner}
            </Text>
          </View>
        </View>
      );
    } else {
      statusContent = (
        <View style={[
          styles.turnContainer,
          {
            backgroundColor: colors.boardBackground,
            shadowColor: colors.shadowColor
          }
        ]}>
          <View style={styles.turnInfo}>
            <Text style={[
              styles.turnLabel,
              { color: colors.turnLabelText }
            ]}>Current Turn</Text>
            <View style={[
              styles.turnPlayerContainer,
              {
                backgroundColor: gameState.currentPlayer === 'X' ? colors.xTurnBackground : colors.oTurnBackground,
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

    // Wrap all status content in a fixed-height container to prevent layout shift
    // No animations to avoid flashing during transitions
    return (
      <View
        style={styles.statusContainer}
      >
        {statusContent}
      </View>
    );
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
      {/* App Header with Shadow */}
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: colors.background, // Match main background
            shadowColor: colors.shadowColor,
          },
          // Create separate style object for dynamic padding
          Platform.OS === 'android'
            ? androidPaddingStyle
            : iosPaddingStyle
        ]}
      >
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
      </View>

      <View style={styles.gameContent}>
        {/* Scoreboard Card */}
        <View style={[
          styles.cardContainer,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
            shadowColor: colors.cardShadow
          }
        ]}>
          {renderScoreboard()}
        </View>

        {/* Game Status */}
        {renderStatus()}

        {/* Game Board */}
        <View style={styles.boardWrapper}>
          <Board
            board={gameState.board}
            onCellPress={handleCellPress}
            gameOver={gameState.gameOver}
          />
        </View>

        {/* Game Controls */}
        <View style={styles.controlsContainer}>
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
      </View>

      {/* Footer */}
      <View style={[
        styles.footer,
        {
          backgroundColor: colors.background, // Match main background
          borderTopColor: colors.cardBorder,
          paddingBottom: Math.max(insets.bottom, Platform.OS === 'android' ? 16 : 8), // Use insets for proper bottom spacing
        }
      ]}>
        <Text style={[styles.footerText, { color: colors.turnLabelText }]}>
          Built with React Native • {new Date().getFullYear()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Using theme colors instead of literal 'transparent'
  },
  headerContainer: {
    width: '100%',
    // Bottom padding only - top padding is set dynamically with insets
    paddingBottom: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  gameContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 0, // Reduced since footer is not absolute anymore
    overflow: 'visible', // Ensure content doesn't get clipped
  },
  cardContainer: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12, // Moderate padding
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 12, // Moderate spacing
    width: 300, // Exactly match the game board width
    alignSelf: 'center', // Center the card
  },
  scoreboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Distribute items evenly
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%', // Take full width of parent
  },
  scoreItem: {
    alignItems: 'center',
    minWidth: 38,
    flex: 1, // Take equal space
  },
  playerBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6, // Moderate margin
  },
  playerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  themeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  themeButtonText: {
    fontSize: 18,
  },
  boardWrapper: {
    marginTop: 5, // Added top margin
    marginBottom: 15, // Moderate spacing
    alignItems: 'center',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10, // Moderate spacing
    borderRadius: 20,
    paddingVertical: 14, // Moderate padding
    paddingHorizontal: 22, // Moderate horizontal padding
    borderWidth: 2,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    minWidth: 280,
    justifyContent: 'flex-start',
  },
  statusIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  statusIcon: {
    fontSize: 22,
  },
  // status style removed as it was unused
  winnerTextContainer: {
    flexDirection: 'column',
  },
  winnerLabel: {
    fontSize: 15,
    marginBottom: 2,
  },
  winnerPlayer: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusContainer: {
    height: 90, // Moderate height
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12, // Moderate margin
    marginTop: 8, // Moderate margin
  },
  turnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Match statusCard
    paddingHorizontal: 24,
    paddingVertical: 14, // Match statusCard
    borderRadius: 20,
    // Enhanced shadow for better depth
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    minWidth: 180,
  },
  turnInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 4, // Added spacing
  },
  turnLabel: {
    fontSize: 16,
    fontWeight: '600', // Updated from '500' to match inline style
    marginBottom: 10,
  },
  turnPlayerContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  turnPlayer: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controlsContainer: {
    marginTop: 5,
    marginBottom: 10, // Moderate space above footer
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 26,
    paddingVertical: 12, // Moderate padding
    borderRadius: 24,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    minWidth: 160, // Moderate width
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    paddingTop: 10,
    marginTop: 8,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.7,
  },
});

export default GameScreen;
