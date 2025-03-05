import { getAllMoves, getKingMoves } from "../possibleMoves/moveGenerator";
import { getKingPosition, isKingInCheck } from "./check";
import { Game } from "../index";

/**
 * Checks if the king is in checkmate
 * @param board The board to check
 * @param isWhite Whether the king is white or black
 * @returns Whether the king is in checkmate
 */
export function checkmate(game: Game, isWhite: boolean): boolean {
    const board = game.gameState.board;
    if (!isKingInCheck(board, isWhite)) return false;

    const kingPosition = getKingPosition(board, isWhite);
    const kingMoves = getKingMoves(game, kingPosition, isWhite);

    if (kingMoves.length === 0) {
        const allMoves = getAllMoves(game, isWhite);
        return Array.from(allMoves.values()).every(moves => moves.length === 0);
    }

    return false;
}
