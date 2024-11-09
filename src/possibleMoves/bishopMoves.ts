import { board, current_player, previous_player } from "..";

export function getBishopMove(row: number, col: number): [number, number][] {
    const moves: [number, number][] = [];

    for (let i = 0; i < 8; i++) {
        if (row + i < 8 && col + i < 8) {
            if (board[row + i][col + i].startsWith(previous_player)) {
                moves.push([row + i, col + i])
                break
            } else if (board[row + i][col + i].startsWith(current_player)) {
                break
            }

            moves.push([row + i, col + i]);
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row - i >= 0 && col + i < 8) {
            if (board[row - i][col + i].startsWith(previous_player)) {
                moves.push([row - i, col + i]);
                break
            } else if (board[row - i][col + i].startsWith(current_player)) {
                break
            }

            moves.push([row - i, col + i]);
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row + i < 8 && col - i >= 0) {
            if (board[row + i][col - i].startsWith(previous_player)) {
                moves.push([row + i, col - i]);
                break
            } else if (board[row + i][col + i].startsWith(current_player)) {
                break
            }

            moves.push([row + i, col - i]);
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row - i >= 0 && col - i >= 0) {
            if (board[row - i][col - i].startsWith(previous_player)) {
                moves.push([row - i, col - i]);
                break
            } else if (board[row - i][col - i].startsWith(current_player)) {
                break
            }

            moves.push([row - i, col - i]);
        }
    }

    return moves;
}
