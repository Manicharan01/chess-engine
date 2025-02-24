import { getAllBlackMove } from "../possibleMoves/allBlackMoves";
import { getAllWhiteMove } from "../possibleMoves/allWhiteMoves";
import { Board } from "../types/types";
import { isKingInCheck } from "./check";

export function isStalemate(board: Board, current_player_color: string): boolean {
    if (isKingInCheck(board, current_player_color)) return false;

    const allMoves = current_player_color === "white" ? getAllBlackMove(board) : getAllWhiteMove(board);

    return allMoves.length === 0;
}
