import { Board, Position } from "../types/types";

/**
* Gets the king position on the board based on the color of the king
* @param board The board to get the king position from
* @param isWhite Whether the king is white or black
* @returns The position of the king on the board
*/
export function getKingPosition(board: Board, isWhite: boolean): Position {
    const kingColor = isWhite ? "white" : "black";
    let kingPosition: Position = { row: -1, col: -1 }
    outer: for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j]
            if (piece && piece === kingColor + "_king") {
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
    * Checks if the king is in check
    * @param board The board to check
    * @param isWhite Whether the king is white or black
    * @returns true if the king is in check, false otherwise
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
                const piece = board[pawnRow][col]
                if (piece && piece === opponent + "_pawn") {
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
            const piece = board[rowIndex][colIndex]
            if (piece && piece === opponent + "_knight") {
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
            const piece = board[rowIndex][colIndex]
            if (piece) {
                if (piece.startsWith(opponent)) {
                    const pieceType = piece.split("_")[1];

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
