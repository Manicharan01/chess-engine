import { getKingMoves } from "../possibleMoves/moveGenerator";
import { Position } from "../types/types";
import { getKingPosition } from "./check";
import { Board } from "../index";

/**
 * Checks if the king is in checkmate
 * @param board The board to check
 * @param isWhite Whether the king is white or black
 * @returns Whether the king is in checkmate
 */
export function checkmate(board: Board, isWhite: boolean): boolean {
    let kingPosition: Position = getKingPosition(board, isWhite)

    let kingMoves: Position[] = getKingMoves(board, kingPosition, isWhite)

    return kingMoves.length === 0;
}
