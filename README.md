# TypeScript Chess Engine

This is a simple chess engine written in TypeScript. It is a work in progress, but it is already capable of playing a full game of chess.

## Features

*   **Full chess logic:** The engine implements all the rules of chess, including castling, en passant, and promotion.
*   **Move generation:** The engine can generate all possible moves for a given position.
*   **Check and checkmate detection:** The engine can detect when a king is in check or checkmate.
*   **Stalemate detection:** The engine can detect when the game is in a stalemate.

## Getting Started

To get started with the chess engine, you will need to have Node.js and TypeScript installed on your machine.

1.  Clone the repository:

```
git clone https://github.com/your-username/typescript-chess-engine.git
```

2.  Install the dependencies:

```
npm install
```

3.  Compile the TypeScript code:

```
tsc
```

4.  Run the tests:

```
npx jest
```

## Usage

To use the chess engine, you can create a new `Game` instance and then call the `makeMove` method to make moves on the board.

```typescript
import { Game } from "./src";

const game = new Game();

game.makeMove({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
game.makeMove({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } });

game.board.display();
```

## Architecture

The chess engine is divided into the following components:

*   **`src/core`:** This directory contains the core classes of the chess engine, including the `Game`, `Board`, and `Piece` classes.
*   **`src/game-logic`:** This directory contains the game logic, including move generation, check and checkmate detection, and stalemate detection.
*   **`src/constants`:** This directory contains the constants used in the chess engine.
*   **`src/test-utils`:** This directory contains utility functions for testing the chess engine.

## Contributing

If you would like to contribute to the chess engine, please open a pull request.

## License

This project is licensed under the MIT License.
