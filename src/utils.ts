import { Move, Position } from "./types/types";
import { Board, BOARD_SIZE, Game } from "./index";

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

/**
 * Checks if a position is being attacked by the opponent
 * @param game The game to check
 * @param position The position to check
 * @returns True if the position is being attacked, false otherwise
 */
export function isTheSquareBeingAttacked(game: Game, position: Position): boolean {
    const board = game.gameState.board;
    const opponent = game.gameState.currentPlayer === "white" ? "black" : "white";

    const pawnDirection = game.gameState.currentPlayer === "white" ? -1 : 1;
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
