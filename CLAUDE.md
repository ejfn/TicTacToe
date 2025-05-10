# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Tic Tac Toe game built with React Native and Expo. It's a simple implementation with a single game board where two players can take turns marking X and O on a 3x3 grid.

## Commands

### Development

```bash
# Start the Expo development server
npm run start

# Start on specific platforms
npm run android  # Start on Android
npm run ios      # Start on iOS
npm run web      # Start on web

# Start without development server (production mode)
npx expo start --no-dev
```

### Testing

```bash
# Run all tests
npm test

# Run specific test file
npx jest __tests__/gameLogic.test.ts

# Run tests with coverage
npx jest --coverage
```

### Code Quality

```bash
# Run TypeScript type checking
npm run typecheck

# Run ESLint
npm run lint

# Run ESLint and fix issues
npm run lint:fix

# Run Prettier to format code
npm run format
```

### Version Notes

- The app requires specific versions of React and React-related packages:
  - React: 19.0.0 (not 19.1.0)
  - @types/react: ~19.0.10
  - react-test-renderer: 19.0.0

- Using newer versions may cause render errors with Expo

## Architecture

The application follows a simple component-based architecture:

### Core Components

1. **GameScreen** (`app/screens/GameScreen.tsx`): Main screen that manages game state and contains the game board
2. **Board** (`app/components/Board.tsx`): Renders the 3x3 grid of cells
3. **Cell** (`app/components/Cell.tsx`): Individual clickable cell that displays X, O, or empty

### Theme Context

The app uses a custom theme context for dark/light mode:

- **ThemeContext** (`app/context/ThemeContext.tsx`): Theme provider with light/dark themes
- **useTheme** hook for accessing colors and theme functions

### Game Logic

Game logic is separated in `app/utils/gameLogic.ts` with functions for:

- `createEmptyBoard()`: Initializes a new empty game board
- `checkWinner()`: Determines if there's a winner or draw
- `makeMove()`: Updates the board with a player's move
- `switchPlayer()`: Alternates between X and O

### Type Definitions

The core game types are defined in `app/types/game.ts`:

- `Player`: 'X' | 'O'
- `Board`: Array of cell values
- `GameState`: Contains board state, current player, winner, and game status

### State Management

Game state is managed in the GameScreen component using React's useState hook with the following properties:

- `board`: Current state of the 3x3 grid
- `currentPlayer`: Current player (X or O)
- `winner`: Winner of the game or 'DRAW' if the game ends in a draw
- `gameOver`: Boolean indicating if the game is over
- `winCounts`: Tracks wins for X, O, and draws

### Animations

The game includes React Native Animated API for:

- Cell animations when marking X or O
- Button press animations
- Theme transition effects

### Testing

Tests use Jest and React Native Testing Library:
- Game logic tests are fully implemented
- Component tests use mocks to handle animations
