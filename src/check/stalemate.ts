import { getAllMoves } from "../possibleMoves/moveGenerator";
import { Board } from "../index";
import { isKingInCheck } from "./check";

export function isStalemate(board: Board, isWhite: boolean): boolean {
    if (isKingInCheck(board, isWhite)) return false;

    const allMoves = getAllMoves(board, isWhite);

    return false;
}
