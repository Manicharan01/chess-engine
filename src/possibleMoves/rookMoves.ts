import { board, current_player, previous_player } from "..";
import { parseMove } from "../moveParser";

export function getRookMove(row: number, col: number, opponent: string, your_color: string): [number, number][] {
    const moves: [number, number][] = [];

    for (let i = row + 1; i < 8; i++) {
        if (board[i][col].startsWith(your_color)) {
            break
        } else if (board[i][col].startsWith(opponent)) {
            moves.push([i, col])
            break
        }

        moves.push([i, col])
    }

    for (let i = row - 1; i >= 0; i--) {
        if (board[i][col].startsWith(your_color)) {
            break
        } else if (board[i][col].startsWith(opponent)) {
            moves.push([i, col])
            break
        }

        moves.push([i, col])
    }

    for (let i = col + 1; i < 8; i++) {
        if (board[row][i].startsWith(your_color)) {
            break
        } else if (board[row][i].startsWith(opponent)) {
            moves.push([row, i]);
            break
        }

        moves.push([row, i])
    }

    for (let i = col - 1; i >= 0; i--) {
        if (board[row][i].startsWith(your_color)) {
            break
        } else if (board[row][i].startsWith(opponent)) {
            moves.push([row, i]);
            break
        }

        moves.push([row, i])
    }

    return moves;
}

export function isMoveLegal(piecePosition: [number, number], current_move: string): boolean {
    let legalMove: boolean = false;

    if (board[piecePosition[0]][piecePosition[1]].startsWith("white_")) {
        const rookMoves: [number, number][] = getRookMove(piecePosition[0], piecePosition[1], "black", "white");
        const [row, col] = parseMove(current_move);

        rookMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    } else if (board[piecePosition[0]][piecePosition[1]].startsWith("black_")) {
        const rookMoves: [number, number][] = getRookMove(piecePosition[0], piecePosition[1], "white", "black");
        const [row, col] = parseMove(current_move);

        rookMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    }

    return legalMove
}
