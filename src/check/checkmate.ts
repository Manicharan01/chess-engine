import { getKingMoves } from "../possibleMoves/moveGenerator";
import { Board, Position } from "../types/types";
import { getKingPosition } from "./check";

export function checkmate(board: Board, isWhite: boolean): boolean {
    let kingPosition: Position = getKingPosition(board, isWhite)

    let kingMoves: Position[] = getKingMoves(board, kingPosition, isWhite)

    return kingMoves.length === 0;
}
