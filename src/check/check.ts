import { getAllBlackMove } from "../possibleMoves/allBlackMoves";
import { getAllWhiteMove } from "../possibleMoves/allWhiteMoves";
import { Board } from "../types/types";

export function isKingInCheck(board: Board, current_player_color: string): boolean {
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

    if (kingPosition[0] === -1) {
        throw new Error("King not found on the board!")
    }

    let opponentMoves: [number, number][] = current_player_color === "white" ? getAllBlackMove(board) : getAllWhiteMove(board);

    return opponentMoves.some(move => move[0] === kingPosition[0] && move[1] === kingPosition[1])
}
//
// const someBoard: Board = [
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, 'black_bishop', null, null, null, null, null, 'black_queen'],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, 'white_king', null, "white_rook"],
// ]
//
// console.log(isKingInCheck(someBoard, 'white'))
