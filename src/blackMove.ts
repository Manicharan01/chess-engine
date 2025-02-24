import { board } from './index';

export function getAllBlackMoves(move: string): boolean {
    const size = board.length;
    console.log(size, move);

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].startsWith("black_")) {
            }
        }
    }

    return true
}

