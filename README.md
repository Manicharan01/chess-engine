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

4.  Run the engine:

```
node build/index.js
```

## Usage

To use the chess engine, you can create a new `Game` instance and then call the `makeMove` method to make moves on the board.

```typescript
import { Game } from "./index";

const game = new Game();

game.gameState.makeMove({ from: { row: 6, col: 4 }, to: { row: 4, col: 4 } });
game.gameState.makeMove({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } });

game.gameState.board.display();
```

## Architecture

The chess engine is divided into the following components:

*   **`src/index.ts`:** The main file of the chess engine. It contains the `Game`, `GameState`, `Board`, and `Piece` classes.
*   **`src/types/types.ts`:** This file contains the type definitions for the chess engine.
*   **`src/utils.ts`:** This file contains utility functions for the chess engine.
*   **`src/helper.ts`:** This file contains helper functions for validating moves and initializing the board.
*   **`src/moveParser.ts`:** This file contains functions for parsing algebraic notation.
*   **`src/possibleMoves/moveGenerator.ts`:** This file contains functions for generating possible moves for each piece type.
*   **`src/check/check.ts`:** This file contains functions for determining if a king is in check.
*   **`src/check/checkmate.ts`:** This file contains a function for determining if a king is in checkmate.
*   **`src/check/stalemate.ts`:** This file contains a function for determining if the game is in a stalemate.

## Contributing

If you would like to contribute to the chess engine, please open a pull request.

## License

This project is licensed under the MIT License.
