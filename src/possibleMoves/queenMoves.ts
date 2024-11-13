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
