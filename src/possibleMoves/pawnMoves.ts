import { board } from "..";
import { parseMove } from "../moveParser";

export function getPawnMoves(row: number, col: number, opponent: string, isWhite: boolean): [number, number][] {
    const moves: [number, number][] = [];
    let whitePromotingAvailable: boolean = false;
    let blackPromotingAvailable: boolean = false;

    if (isWhite) {
        if (row === 1) {
            moves.push([row + 2, col]);
        }

        if (row === 6) {
            whitePromotingAvailable = true;
        }

        if (row + 1 < 8) {
            if (board[row + 1][col] === "0") {
                moves.push([row + 1, col]);
            }
        }

        if (row + 1 < 8 && col + 1 < 8) {
            if (board[row + 1][col + 1].startsWith(opponent)) {
                moves.push([row + 1, col + 1]);
            }
        }

        if (row + 1 < 8 && col - 1 >= 0) {
            if (board[row + 1][col - 1].startsWith(opponent)) {
                moves.push([row + 1, col - 1]);
            }
        }
    } else {
        if (row === 6) {
            moves.push([row - 2, col]);
        }

        if (row === 1) {
            blackPromotingAvailable = true;
        }

        if (row - 1 >= 0) {
            if (board[row - 1][col] === "0") {
                moves.push([row - 1, col]);
            }
        }

        if (row - 1 >= 0 && col + 1 < 8) {
            if (board[row - 1][col + 1].startsWith(opponent)) {
                moves.push([row - 1, col + 1]);
            }
        }

        if (row - 1 >= 0 && col - 1 >= 0) {
            if (board[row - 1][col - 1].startsWith(opponent)) {
                moves.push([row - 1, col - 1]);
            }
        }
    }

    return moves;
}

export function isMoveLegal(piecePosition: [number, number], current_move: string): boolean {
    let legalMove: boolean = false;

    if (board[piecePosition[0]][piecePosition[1]].startsWith("white_")) {
        const pawnMoves: [number, number][] = getPawnMoves(piecePosition[0], piecePosition[1], "black", false);
        const [row, col] = parseMove(current_move);

        pawnMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    } else if (board[piecePosition[0]][piecePosition[1]].startsWith("black_")) {
        const pawnMoves: [number, number][] = getPawnMoves(piecePosition[0], piecePosition[1], "white", false);
        const [row, col] = parseMove(current_move);

        pawnMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    }

    return legalMove
}
