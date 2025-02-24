import { board, current_player, previous_player } from "..";
import { parseMove } from "../moveParser";
import { Board } from "../types/types";

export function getRookMove(board: Board, row: number, col: number, opponent: string, your_color: string): [number, number][] {
    const moves: [number, number][] = [];

    for (let i = row + 1; i < 8; i++) {
        const piece = board[i][col]
        if (piece && piece.startsWith(your_color)) {
            break
        } else if (piece && piece.startsWith(opponent)) {
            moves.push([i, col])
            break
        }

        moves.push([i, col])
    }

    for (let i = row - 1; i >= 0; i--) {
        const piece = board[i][col]
        if (piece && piece.startsWith(your_color)) {
            break
        } else if (piece && piece.startsWith(opponent)) {
            moves.push([i, col])
            break
        }

        moves.push([i, col])
    }

    for (let i = col + 1; i < 8; i++) {
        const piece = board[row][i]
        if (piece && piece.startsWith(your_color)) {
            break
        } else if (piece && piece.startsWith(opponent)) {
            moves.push([row, i]);
            break
        }

        moves.push([row, i])
    }

    for (let i = col - 1; i >= 0; i--) {
        const piece = board[row][i]
        if (piece && piece.startsWith(your_color)) {
            break
        } else if (piece && piece.startsWith(opponent)) {
            moves.push([row, i]);
            break
        }

        moves.push([row, i])
    }

    return moves;
}

export function isMoveLegal(board: Board, piecePosition: [number, number], current_move: string): boolean {
    let legalMove: boolean = false;

    const piece = board[piecePosition[0]][piecePosition[1]]
    if (piece && piece.startsWith("white_")) {
        const rookMoves: [number, number][] = getRookMove(board, piecePosition[0], piecePosition[1], "black", "white");
        const [row, col] = parseMove(current_move);

        rookMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    } else if (piece && piece.startsWith("black_")) {
        const rookMoves: [number, number][] = getRookMove(board, piecePosition[0], piecePosition[1], "white", "black");
        const [row, col] = parseMove(current_move);

        rookMoves.map(([r, c]) => {
            if (r === row && c === col) {
                legalMove = true
            }
        })
    }

    return legalMove
}
