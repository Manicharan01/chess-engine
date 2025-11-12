import { getAllMoves } from "../possibleMoves/moveGenerator";
import { Game } from "../index";
import { isKingInCheck } from "./check";

/**
 * Checks if the game is in a stalemate.
 * @param game The game instance.
 * @param isWhite Whether the current player is white or black.
 * @returns True if the game is in a stalemate, false otherwise.
 */
export function isStalemate(game: Game, isWhite: boolean): boolean {
    const board = game.gameState.board;
    if (isKingInCheck(board, isWhite)) return false;

    const allMoves = getAllMoves(game, isWhite);

    return Array.from(allMoves.values()).every(moves => moves.length === 0);
}
