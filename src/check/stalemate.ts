import { getAllBlackMove } from "../possibleMoves/allBlackMoves";
import { getAllWhiteMove } from "../possibleMoves/allWhiteMoves";
import { Board, Position } from "../types/types";
import { isKingInCheck } from "./check";

export function isStalemate(board: Board, kingPosition: Position, isWhite: boolean): boolean {
    if (isKingInCheck(board, isWhite)) return false;

    const allMoves = isWhite ? getAllBlackMove(board) : getAllWhiteMove(board);

    return allMoves.length === 0;
}
