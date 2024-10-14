import { getBishopMove } from "./bishopMoves";
import { getRookMove } from "./rookMoves";

export function getQueenMove(row: number, col: number): [number, number][] {
    const rookMoves: [number, number][] = getRookMove(row, col);
    const bishopMoves: [number, number][] = getBishopMove(row, col);
    const queenMoves: [number, number][] = [];

    rookMoves.map((move) => queenMoves.push(move));
    bishopMoves.map((move) => queenMoves.push(move));
    return queenMoves;
}
