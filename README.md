# Tic Tac Toe

A modern, responsive Tic Tac Toe game built with React Native and Expo that runs on mobile, web, and is deployed to GitHub Pages.

🎮 **[Play the game online →](https://ejfn.github.io/TicTacToe)**

![Tic Tac Toe Game](./assets/icon.png)

## Features

- 🎮 Classic 3x3 Tic Tac Toe gameplay
- 🎯 Animated X and O markers
- 🏆 Player score tracking
- 🎨 Beautiful UI with smooth animations
- 🌓 Dark/Light theme toggle
- 🔄 Alternating first player on game reset
- 📱 Cross-platform: iOS, Android, and Web
- 🌐 Deployed on GitHub Pages for instant play

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **TypeScript** - Type-safe JavaScript
- **React Hooks** - Modern state management
- **Animated API** - Smooth animations
- **GitHub Pages** - Web deployment

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

   ```bash
   git clone https://github.com/ejfn/TicTacToe.git
   cd TicTacToe
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the Expo development server

   ```bash
   npm start
   ```

4. Run on a specific platform
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   npm run web      # For web browser
   ```

## Deployment

The web version is automatically deployed to GitHub Pages. To deploy updates:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## Testing

The project includes comprehensive tests for game logic and components:

```bash
npm test
```

Test coverage includes:
- Game logic functions (winner detection, board state, player moves)
- Component rendering and interactions
- Edge cases and game flow

## Design Choices

- **Theme Support**: The app includes both light and dark themes that can be toggled with a single tap
- **Score Tracking**: The game tracks wins for both X and O players, as well as draws
- **Player Alternation**: The starting player alternates after each game to ensure fairness
- **Custom Markers**: Custom-designed X and O markers with animations for improved visual appeal
- **Responsive Layout**: The interface adapts to different screen sizes and platforms
- **Cross-Platform**: Single codebase runs on iOS, Android, and Web browsers
- **Modern Architecture**: Uses TypeScript, React Hooks, and component-based design

## Live Demo

🌐 **Play online:** [https://ejfn.github.io/TicTacToe](https://ejfn.github.io/TicTacToe)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with React Native and Expo for cross-platform compatibility
- Deployed on GitHub Pages for easy access
- Inspired by classic Tic Tac Toe games with modern UI/UX enhancements
