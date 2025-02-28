import { getAllOpponentMoves } from "../possibleMoves/moveGenerator";
import { Board } from "../types/types";
import { isKingInCheck } from "./check";

export function isStalemate(board: Board, isWhite: boolean): boolean {
    if (isKingInCheck(board, isWhite)) return false;

    const allMoves = getAllOpponentMoves(board, isWhite);

    return false;
}
