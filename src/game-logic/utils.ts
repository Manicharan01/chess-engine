import { Move, Position } from "../core/types/types";
import { Board, Game } from "../core";
import { BOARD_SIZE } from "../constants";
import { isTheSquareBeingAttacked } from "./check/check";

/**
 * Creates a deep copy of the board.
 * @param board The board to deep copy.
 * @returns A new board instance that is a deep copy of the original board.
 */
export function deepCopyBoard(board: Board): Board {
    return board.clone();
}

/**
 * Applies a move to a given board.
 * @param board The board to apply the move to.
 * @param move The move to apply.
 * @returns A new board with the move applied.
 */
export function applyMove(board: Board, move: Move): Board {
    let newBoard = deepCopyBoard(board);

    const { from, to } = move;
    const fromPiece = board.getPiece(from);
    board.setPiece(from, null);
    board.setPiece(to, fromPiece);

    return newBoard;
}

/**
 * Checks if a position is within the bounds of the board.
 * @param row The row of the position.
 * @param col The column of the position.
 * @returns True if the position is within the bounds of the board, false otherwise.
 */
export function isWithinBounds(row: number, col: number): boolean {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

/**
 * Checks if a path is clear of any pieces.
 * @param game The game instance.
 * @param path The path to check, represented as an array of positions.
 * @returns True if the path is clear, false otherwise.
 */
export function isPathClear(game: Game, path: Position[]): boolean {
    for (const position of path) {
        const piece = game.board.getPiece(position);
        if (piece) {
            return false;
        }
    }

    return true;
}

/**
 * Checks if any of the squares in a path are being attacked by the opponent.
 * @param game The game instance.
 * @param path The path to check, represented as an array of positions.
 * @returns True if any square in the path is being attacked, false otherwise.
 */
export function isPathAttacked(game: Game, path: Position[]): boolean {
    for (const position of path) {
        if (isTheSquareBeingAttacked(game, position)) {
            return true;
        }
    }

    return false;
}
