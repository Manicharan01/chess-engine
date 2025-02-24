import { parseMove } from "../moveParser";
import { Board } from "../types/types";

export function getBishopMove(board: Board, row: number, col: number, opponent: string, your_color: string): [number, number][] {
    const moves: [number, number][] = [];

    for (let i = 1; i < 8; i++) {
        if (row + i < 8 && col + i < 8) {
            const piece = board[row + i][col + i]
            if (piece && piece.startsWith(opponent + "_")) {
                moves.push([row + i, col + i])
                break
            } else if (piece && piece.startsWith(your_color + "_")) {
                break
            }

            moves.push([row + i, col + i]);
        }
    }
    for (let i = 1; i < 8; i++) {
        if (row - i >= 0 && col + i < 8) {
            const piece = board[row - i][col + i]
            if (piece && piece.startsWith(opponent + "_")) {
                moves.push([row - i, col + i]);
                break
            } else if (piece && piece.startsWith(your_color + "_")) {
                break
            }

            moves.push([row - i, col + i]);
        }
    }
    for (let i = 1; i < 8; i++) {
        if (row + i < 8 && col - i >= 0) {
            const piece = board[row + i][col - i]
            if (piece && piece.startsWith(opponent + "_")) {
                moves.push([row + i, col - i]);
                break
            } else if (piece && piece.startsWith(your_color + "_")) {
                break
            }

            moves.push([row + i, col - i]);
        }
    }
    for (let i = 1; i < 8; i++) {
        if (row - i >= 0 && col - i >= 0) {
            const piece = board[row - i][col - i]
            if (piece && piece.startsWith(opponent + "_")) {
                moves.push([row - i, col - i]);
                break
            } else if (piece && piece.startsWith(your_color + "_")) {
                break
            }

            moves.push([row - i, col - i]);
        }
    }

    return moves;
}

// export function isMoveLegal(piecePosition: [number, number], current_move: string): boolean {
//     let legalMove: boolean = false;
//
//     if (board[piecePosition[0]][piecePosition[1]].startsWith("white_")) {
//         const bishopMoves: [number, number][] = getBishopMove(piecePosition[0], piecePosition[1], "black", "white");
//         const [row, col] = parseMove(current_move);
//
//         bishopMoves.map(([r, c]) => {
//             if (r === row && c === col) {
//                 legalMove = true
//             }
//         })
//     } else if (board[piecePosition[0]][piecePosition[1]].startsWith("black_")) {
//         const bishopMoves: [number, number][] = getBishopMove(piecePosition[0], piecePosition[1], "white", "black");
//         const [row, col] = parseMove(current_move);
//
//         bishopMoves.map(([r, c]) => {
//             if (r === row && c === col) {
//                 legalMove = true
//             }
//         })
//     }
//
//     return legalMove
// }
