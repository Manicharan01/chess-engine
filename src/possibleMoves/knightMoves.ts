import { board } from "..";
import { parseMove } from "../moveParser";

export function getKnightMoves(row: number, col: number, opponent: string): [number, number][] {
    const knightMoves: [number, number][] = [
        [row + 2, col + 1], [row + 2, col - 1],
        [row - 2, col + 1], [row - 2, col - 1],
        [row + 1, col + 2], [row + 1, col - 2],
        [row - 1, col + 2], [row - 1, col - 2]
    ];

    return knightMoves.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8 && (board[r][c].startsWith(opponent) || board[r][c] === "0"));
}

export function isMoveLegal(piecePosition: [number, number], current_move: string): boolean {
    let legalMove: boolean = false;

    if (board[piecePosition[0]][piecePosition[1]].startsWith("white_")) {
        const knightMoves: [number, number][] = getKnightMoves(piecePosition[0], piecePosition[1], "black");
        const [row, col] = parseMove(current_move);

        knightMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    } else if (board[piecePosition[0]][piecePosition[1]].startsWith("black_")) {
        const knightMoves: [number, number][] = getKnightMoves(piecePosition[0], piecePosition[1], "white");
        const [row, col] = parseMove(current_move);

        knightMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    }

    return legalMove
}
