import { board } from "..";

export function getPawnMoves(row: number, col: number, opponent: string, isWhite: boolean): [number, number][] {
    const moves: [number, number][] = [];
    let whitePromotingAvailable: boolean = false;
    let blackPromotingAvailable: boolean = false;

    if (isWhite) {
        if (row === 6) {
            moves.push([row - 2, col]);
        }

        if (row === 2) {
            whitePromotingAvailable = true;
        }

        if (board[row - 1][col] === "0" && row - 1 >= 0) {
            moves.push([row - 1, col]);
        }

        if (row - 1 >= 0 && col + 1 < 8) {
            if (board[row - 1][col + 1].startsWith(opponent)) {
                moves.push([row - 1, col + 1]);
            }
        }

        if (row - 1 >= 0 && col - 1 >= 0) {
            if (board[row - 1][col - 1].startsWith(opponent)) {
                moves.push([row - 1, col - 1]);
            }
        }
    } else {
        if (row === 1) {
            moves.push([row + 2, col]);
        }

        if (row === 6) {
            blackPromotingAvailable = true;
        }

        if (board[row + 1][col] === "0" && row + 1 < 8) {
            moves.push([row + 1, col]);
        }

        if (row + 1 < 8 && col + 1 < 8) {
            if (board[row + 1][col + 1].startsWith(opponent)) {
                moves.push([row + 1, col + 1]);
            }
        }

        if (row + 1 < 8 && col - 1 >= 0) {
            if (board[row + 1][col - 1].startsWith(opponent)) {
                moves.push([row + 1, col - 1]);
            }
        }
    }

    return moves;
}

console.log(getPawnMoves(1, 3, "white", false));
