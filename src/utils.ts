import { Board, Move } from "./types/types";

/**
 * Deep copies a board
 * @param board The board to deep copy
 * @returns A deep copy of the board
 */
export function deepCopyBoard(board: Board): Board {
    return board.map(row => [...row]);
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
    newBoard[from.row][from.col] = null;
    newBoard[to.row][to.col] = board[from.row][from.col];

    return newBoard;
}
