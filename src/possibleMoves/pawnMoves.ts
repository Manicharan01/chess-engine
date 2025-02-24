import { parseMove } from "../moveParser";
import { Board } from "../types/types";

export function getPawnMoves(board: Board, row: number, col: number, opponent: string, isWhite: boolean): [number, number][] {
    const moves: [number, number][] = [];
    let whitePromotingAvailable: boolean = false;
    let blackPromotingAvailable: boolean = false;

    if (isWhite) {
        if (row === 6) {
            moves.push([row - 2, col]);
        }

        if (row === 1) {
            whitePromotingAvailable = true;
        }

        if (row - 1 < 8) {
            const piece = board[row - 1][col]
            if (piece && piece === null) {
                moves.push([row - 1, col]);
            }
        }

        if (row - 1 < 8 && col + 1 < 8) {
            const piece = board[row - 1][col + 1]
            if (piece && piece.startsWith(opponent)) {
                moves.push([row - 1, col + 1]);
            }
        }

        if (row - 1 < 8 && col - 1 >= 0) {
            const piece = board[row - 1][col - 1]
            if (piece && piece.startsWith(opponent)) {
                moves.push([row - 1, col - 1]);
            }
        }
    } else {
        if (row === 1) {
            moves.push([row + 2, col]);
        }

        if (row === 6) {
            blackPromotingAvailable = true;
        }

        if (row + 1 >= 0) {
            const piece = board[row + 1][col]
            if (piece && piece === null) {
                moves.push([row + 1, col]);
            }
        }

        if (row + 1 >= 0 && col + 1 < 8) {
            const piece = board[row + 1][col + 1]
            if (piece && piece.startsWith(opponent)) {
                moves.push([row + 1, col + 1]);
            }
        }

        if (row + 1 >= 0 && col - 1 >= 0) {
            const piece = board[row + 1][col - 1]
            if (piece && piece.startsWith(opponent)) {
                moves.push([row + 1, col - 1]);
            }
        }
    }

    return moves;
}

export function isMoveLegal(board: Board, piecePosition: [number, number], current_move: string): boolean {
    let legalMove: boolean = false;

    const piece = board[piecePosition[0]][piecePosition[1]]
    if (piece && piece.startsWith("white_")) {
        const pawnMoves: [number, number][] = getPawnMoves(board, piecePosition[0], piecePosition[1], "black", false);
        const [row, col] = parseMove(current_move);

        pawnMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    } else if (piece && piece.startsWith("black_")) {
        const pawnMoves: [number, number][] = getPawnMoves(board, piecePosition[0], piecePosition[1], "white", false);
        const [row, col] = parseMove(current_move);

        pawnMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    }

    return legalMove
}
