import { getAllBlackMove } from "../possibleMoves/allBlackMoves";
import { getAllWhiteMove } from "../possibleMoves/allWhiteMoves";
import { isKingInCheck } from "./check";

export function isStalemate(current_player_color: string): boolean {
    if (isKingInCheck(current_player_color)) return false;

    const allMoves = current_player_color === "white" ? getAllBlackMove() : getAllWhiteMove();

    return allMoves.length === 0;
}
