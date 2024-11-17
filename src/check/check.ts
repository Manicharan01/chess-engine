import { board } from "..";
import { getAllBlackMove } from "../possibleMoves/allBlackMoves";
import { getAllWhiteMove } from "../possibleMoves/allWhiteMoves";

export function isKingInCheck(current_player_color: string): boolean {
    let kingPosition: [number, number] = [-1, -1];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === `{current_player}_king`) {
                kingPosition = [i, j];
                break;
            }
        }
    }

    let opponentMoves: [number, number][] = current_player_color === "white" ? getAllBlackMove() : getAllWhiteMove();

    return opponentMoves.some(([r, c]) => r === kingPosition[0] && c === kingPosition[1]);
}
