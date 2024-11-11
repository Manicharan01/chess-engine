import { board, previous_player } from "..";

export function getPawnMoves(row: number, col: number): [number, number][] {
    const moves: [number, number][] = [];

    if (board[row][col].startsWith("white")) {
        if (board[row - 1][col] === "0") {
            moves.push([row - 1, col]);
        }

        if (board[row - 1][col + 1].startsWith(previous_player)) {
            moves.push([row - 1, col + 1]);
        }

        if (board[row - 1][col - 1].startsWith(previous_player)) {
            moves.push([row - 1, col - 1]);
        }
    } else if (board[row][col].startsWith("black")) {
        if (board[row + 1][col] === "0") {
            moves.push([row + 1, col]);
        }

        if (board[row + 1][col + 1].startsWith(previous_player)) {
            moves.push([row + 1, col + 1]);
        }

        if (board[row + 1][col - 1].startsWith(previous_player)) {
            moves.push([row + 1, col - 1]);
        }
    }

    return moves;
}
