import { board } from "..";

export function getBishopMove(row: number, col: number, opponent: string, your_color: string): [number, number][] {
    const moves: [number, number][] = [];

    for (let i = 0; i < 8; i++) {
        if (row + i < 8 && col + i < 8) {
            if (board[row + i][col + i].startsWith(opponent)) {
                moves.push([row + i, col + i])
                break
            } else if (board[row + i][col + i].startsWith(your_color)) {
                break
            }

            moves.push([row + i, col + i]);
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row - i >= 0 && col + i < 8) {
            if (board[row - i][col + i].startsWith(opponent)) {
                moves.push([row - i, col + i]);
                break
            } else if (board[row - i][col + i].startsWith(your_color)) {
                break
            }

            moves.push([row - i, col + i]);
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row + i < 8 && col - i >= 0) {
            if (board[row + i][col - i].startsWith(opponent)) {
                moves.push([row + i, col - i]);
                break
            } else if (board[row + i][col + i].startsWith(your_color)) {
                break
            }

            moves.push([row + i, col - i]);
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row - i >= 0 && col - i >= 0) {
            if (board[row - i][col - i].startsWith(opponent)) {
                moves.push([row - i, col - i]);
                break
            } else if (board[row - i][col - i].startsWith(your_color)) {
                break
            }

            moves.push([row - i, col - i]);
        }
    }

    return moves;
}
