# Tic Tac Toe

A modern, responsive Tic Tac Toe game built with React Native and Expo.

![Tic Tac Toe Game](./assets/icon.png)

## Features

- 🎮 Classic 3x3 Tic Tac Toe gameplay
- 🎯 Animated X and O markers
- 🏆 Player score tracking
- 🎨 Beautiful UI with smooth animations
- 🌓 Dark/Light theme toggle
- 🔄 Alternating first player on game reset

## Tech Stack

- React Native
- Expo
- TypeScript
- React Hooks for state management
- Animated API for smooth animations

## Project Structure

```
/TicTacToe
├── App.tsx                # Main entry re-export
├── app/                   # Main application directory
│   ├── index.tsx          # Main app component
│   ├── components/        # Reusable UI components
│   │   ├── Board.tsx      # Game board component
│   │   └── Cell.tsx       # Individual cell component
│   ├── context/
│   │   └── ThemeContext.tsx # Theme provider & context
│   ├── screens/
│   │   └── GameScreen.tsx # Main game screen
│   ├── types/
│   │   └── game.ts        # TypeScript type definitions
│   ├── utils/
│   │   └── gameLogic.ts   # Game logic functions
│   └── __tests__/         # Jest test files
└── assets/                # Images and resources
```

## Game Logic

The game follows standard Tic Tac Toe rules:

- Players take turns placing X or O on a 3x3 grid
- First player to get 3 in a row (horizontally, vertically, or diagonally) wins
- If all cells are filled and no player has won, the game ends in a draw

## Getting Started

### Prerequisites

- Node.js (>= 14)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/TicTacToe.git
   cd TicTacToe
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the Expo development server

   ```
   npm start
   ```

4. Run on a specific platform
   ```
   npm run android  # For Android
   npm run ios      # For iOS
   npm run web      # For web
   ```

## Testing

Run the test suite with:

```
npm test
```

## Design Choices

- **Theme Support**: The app includes both light and dark themes that can be toggled with a single tap.
- **Score Tracking**: The game tracks wins for both X and O players, as well as draws.
- **Player Alternation**: The starting player alternates after each game to ensure fairness.
- **Custom Markers**: Custom-designed X and O markers with animations for improved visual appeal.
- **Responsive Layout**: The interface adapts to different screen sizes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classic Tic Tac Toe games
- Built with React Native and Expo
