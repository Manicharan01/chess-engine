import { getAllMoves } from "../possibleMoves/moveGenerator";
import { Game } from "../index";
import { isKingInCheck } from "./check";

export function isStalemate(game: Game, isWhite: boolean): boolean {
    const board = game.gameState.board;
    if (isKingInCheck(board, isWhite)) return false;

    const allMoves = getAllMoves(game, isWhite);

    return Array.from(allMoves.values()).every(moves => moves.length === 0);
}
