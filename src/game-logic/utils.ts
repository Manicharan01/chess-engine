import { Move, Position } from "../core/types/types";
import { Board, Game } from "../core";
import { BOARD_SIZE } from "../constants";

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
 * Checks if a square is being attacked by the opponent.
 * @param game The game instance.
 * @param position The position of the square to check.
 * @returns True if the square is being attacked, false otherwise.
 */
export function isTheSquareBeingAttacked(game: Game, position: Position): boolean {
    const board = game.board;
    const opponent = game.currentPlayer === "white" ? "black" : "white";

    const pawnDirection = game.currentPlayer === "white" ? -1 : 1;
    const pawnAttackCols = [position.col - 1, position.col + 1];
    const pawnRow = position.row + pawnDirection;

    if (pawnRow >= 0 && pawnRow < 8) {
        for (const col of pawnAttackCols) {
            if (col >= 0 && col < 8) {
                const piece = board.getPiece({ row: pawnRow, col: col })
                if (piece && piece.color === opponent && piece.type === "pawn") {
                    return true
                }
            }
        }
    }

    const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]
    ];

    for (const [dr, dc] of knightMoves) {
        const rowIndex = position.row + dr;
        const colIndex = position.col + dc;

        if (rowIndex >= 0 && rowIndex < 8 && colIndex >= 0 && colIndex < 8) {
            const piece = board.getPiece({ row: rowIndex, col: colIndex })
            if (piece && piece.color === opponent && piece.type === "knight") {
                return true;
            }
        }
    }


    const directions = [
        { row: 1, col: 0 }, { row: -1, col: 0 }, { row: 0, col: 1 }, { row: 0, col: -1 },
        { row: -1, col: -1 }, { row: -1, col: 1 }, { row: 1, col: -1 }, { row: 1, col: 1 }
    ];

    for (const { row: dr, col: dc } of directions) {
        let rowIndex = position.row + dr;
        let colIndex = position.col + dc;

        let distance = 1;
        while (isWithinBounds(rowIndex, colIndex)) {
            const piece = board.getPiece({ row: rowIndex, col: colIndex })
            if (piece) {
                if (piece.color === opponent) {
                    if (piece.type === "queen" ||
                        (piece.type === "rook" && (rowIndex === position.row || colIndex === position.col)) ||
                        (piece.type === "bishop" && rowIndex !== position.row && colIndex !== position.col)) {
                        return true;
                    }

                    if (piece.type === "king" && distance === 1) {
                        return true;
                    }
                }

                break;
            } else {
                rowIndex += dr;
                colIndex += dc;
                distance++;
            }

        }
    }

    return false;
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
