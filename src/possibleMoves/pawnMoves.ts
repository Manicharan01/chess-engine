import { board, previous_player } from "..";

export function getPawnMoves(row: number, col: number): [number, number][] {
    const moves: [number, number][] = [];
    let whitePromotingAvailable: boolean = false;
    let blackPromotingAvailable: boolean = false;

    if (board[row][col].startsWith("white")) {
        if (row === 6) {
            moves.push([row - 2, col]);
        }

        if (row === 2) {
            whitePromotingAvailable = true;
        }

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
        if (row === 1) {
            moves.push([row + 2, col]);
        }

        if (row === 6) {
            blackPromotingAvailable = true;
        }

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
