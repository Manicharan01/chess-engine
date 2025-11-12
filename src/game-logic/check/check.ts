import { Position } from "../../core/types/types";
import { Board, Game } from "../../core";

/**
* Gets the king's position on the board based on its color.
* @param board The board to get the king's position from.
* @param isWhite Whether the king is white or black.
* @returns The position of the king on the board.
* @throws An error if the king is not found on the board.
*/
export function getKingPosition(board: Board, isWhite: boolean): Position {
    const kingColor = isWhite ? "white" : "black";
    let kingPosition: Position = { row: -1, col: -1 }
    outer: for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board.getPiece({ row: i, col: j })
            if (piece && piece.color === kingColor && piece.type === "king") {
                kingPosition = { row: i, col: j }
                break outer
            }
        }
    }

    if (kingPosition.row === -1) {
        console.error("King position is not found on board")
        throw new Error("King position is not found on board")
    }

    return kingPosition
}

/**
    * Checks if the king is in check.
    * @param board The board to check.
    * @param isWhite Whether the king is white or black.
    * @returns True if the king is in check, false otherwise.
*/
export function isKingInCheck(board: Board, isWhite: boolean): boolean {
    const opponent = isWhite ? "black" : "white";
    const { row: kingRow, col: kingCol } = getKingPosition(board, isWhite)

    //check if king is in check by a pawn
    const pawnDirection = isWhite ? -1 : 1;
    const pawnAttackCols = [kingCol - 1, kingCol + 1];
    const pawnRow = kingRow + pawnDirection;

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

    //check if king is in check by a knight
    const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]
    ];

    for (const [row, col] of knightMoves) {
        const rowIndex = kingRow + row;
        const colIndex = kingCol + col;

        if (rowIndex >= 0 && rowIndex < 8 && colIndex >= 0 && colIndex < 8) {
            const piece = board.getPiece({ row: rowIndex, col: colIndex })
            if (piece && piece.color === opponent && piece.type === "knight") {
                return true;
            }
        }
    }

    // Check for attacks from bishops, rooks, and queens along lines
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (const [row, col] of directions) {
        let rowIndex = kingRow + row;
        let colIndex = kingCol + col;
        let distance = 1;

        while (rowIndex >= 0 && rowIndex < 8 && colIndex >= 0 && colIndex < 8) {
            const piece = board.getPiece({ row: rowIndex, col: colIndex })
            if (piece) {
                if (piece.color === opponent) {
                    const pieceType = piece.type;

                    if (pieceType === "queen" ||
                        (pieceType === "rook" && (rowIndex === kingRow || colIndex === kingCol)) ||
                        (pieceType === "bishop" && row !== 0 && col !== 0)) {
                        return true;
                    }

                    if (pieceType === "king" && distance === 1) {
                        return true;
                    }
                }

                break;
            }

            rowIndex += row
            colIndex += col
            distance++
        }
    }

    return false
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
 * Checks if a position is within the bounds of the board.
 * @param row The row of the position.
 * @param col The column of the position.
 * @returns True if the position is within the bounds of the board, false otherwise.
 */
function isWithinBounds(row: number, col: number): boolean {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}
