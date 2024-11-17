import { board } from "..";
import { truePossibleKingMoves } from "../possibleMoves/kingMoves";

export function checkmate(current_player_color: string): boolean {
    let kingPosition: [number, number] = [-1, -1];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === `{current_player}_king`) {
                kingPosition = [i, j];
                break;
            }
        }
    }

    let kingMoves: [number, number][] = truePossibleKingMoves(current_player_color);

    return kingMoves.length === 0;
}

