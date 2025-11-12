import { getAllMoves, getKingMoves } from "../possible-moves/move-generator";
import { getKingPosition, isKingInCheck } from "./check";
import { Game } from "../../core";

/**
 * Checks if the king is in checkmate.
 * @param game The game instance.
 * @param isWhite Whether the king is white or black.
 * @returns True if the king is in checkmate, false otherwise.
 */
export function checkmate(game: Game, isWhite: boolean): boolean {
    const board = game.board;
    if (!isKingInCheck(board, isWhite)) return false;

    const kingPosition = getKingPosition(board, isWhite);
    const kingMoves = getKingMoves(game, kingPosition, isWhite);

    if (kingMoves.length === 0) {
        const allMoves = getAllMoves(game, isWhite);
        return Array.from(allMoves.values()).every(moves => moves.length === 0);
    }

    return false;
}
