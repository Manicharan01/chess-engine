import { Move } from "./types/types";
import { Board, BOARD_SIZE } from "./index";

/**
 * Deep copies a board
 * @param board The board to deep copy
 * @returns A deep copy of the board
 */
export function deepCopyBoard(board: Board): Board {
    return board.clone();
}

/**
 * Applies a move to a board
 * @param board The board to apply the move to
 * @param move The move to apply
 * @returns A new board with the move applied
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
 * Checks if a position is within the bounds of the board
 * @param row The row of the position
 * @param col The column of the position
 * @returns Whether the position is within the bounds of the board
 */
export function isWithinBounds(row: number, col: number): boolean {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}
