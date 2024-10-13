import { getBishopMove } from "./bishopMoves";
import { getRookMove } from "./rookMoves";

export function getQueenMove(row: number, col: number): [number, number][] {
    return [...getRookMove(row, col), ...getBishopMove(row, col)];
}

console.log(getQueenMove(3, 4));
