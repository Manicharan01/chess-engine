import { Board } from "../types/types";

export function checkmate(board: Board, current_player_color: string): boolean {
    let kingPosition: [number, number] = [-1, -1];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j]
            if (piece && piece === current_player_color + '_king') {
                kingPosition = [i, j];
                break;
            }
        }
    }

    // let kingMoves: [number, number][] = truePossibleKingMoves(board, current_player_color);
    //
    // return kingMoves.length === 0;
    //
    return true
}

