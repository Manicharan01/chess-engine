import { board } from "..";
import { parseMove } from "../moveParser";
import { Board } from "../types/types";

export function getKnightMoves(board: Board, row: number, col: number, opponent: string): [number, number][] {
    const knightMoves: [number, number][] = [
        [row + 2, col + 1], [row + 2, col - 1],
        [row - 2, col + 1], [row - 2, col - 1],
        [row + 1, col + 2], [row + 1, col - 2],
        [row - 1, col + 2], [row - 1, col - 2]
    ];

    return knightMoves.filter(([r, c]) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const piece = board[r][c]
            if (piece && piece.startsWith(opponent) || piece === null) {
                return true
            }
        }
        return false
    });
}

export function isMoveLegal(board: Board, piecePosition: [number, number], current_move: string): boolean {
    let legalMove: boolean = false;

    const piece = board[piecePosition[0]][piecePosition[1]]
    if (piece && piece.startsWith("white_")) {
        const knightMoves: [number, number][] = getKnightMoves(board, piecePosition[0], piecePosition[1], "black");
        const [row, col] = parseMove(current_move);

        knightMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    } else if (piece && piece.startsWith("black_")) {
        const knightMoves: [number, number][] = getKnightMoves(board, piecePosition[0], piecePosition[1], "white");
        const [row, col] = parseMove(current_move);

        knightMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    }

    return legalMove
}
