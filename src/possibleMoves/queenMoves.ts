import { board } from "..";
import { parseMove } from "../moveParser";
import { getBishopMove } from "./bishopMoves";
import { getRookMove } from "./rookMoves";

export function getQueenMove(row: number, col: number, opponent: string, your_color: string): [number, number][] {
    const rookMoves: [number, number][] = getRookMove(row, col, opponent, your_color);
    const bishopMoves: [number, number][] = getBishopMove(row, col, opponent, your_color);
    const queenMoves: [number, number][] = [];

    rookMoves.map((move) => queenMoves.push(move));
    bishopMoves.map((move) => queenMoves.push(move));
    return queenMoves;
}

export function isMoveLegal(piecePosition: [number, number], current_move: string): boolean {
    let legalMove: boolean = false;

    if (board[piecePosition[0]][piecePosition[1]].startsWith("white_")) {
        const queenMoves: [number, number][] = getQueenMove(piecePosition[0], piecePosition[1], "black", "white");
        const [row, col] = parseMove(current_move);

        queenMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    } else if (board[piecePosition[0]][piecePosition[1]].startsWith("black_")) {
        const queenMoves: [number, number][] = getQueenMove(piecePosition[0], piecePosition[1], "white", "black");
        const [row, col] = parseMove(current_move);

        queenMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    }

    return legalMove
}
