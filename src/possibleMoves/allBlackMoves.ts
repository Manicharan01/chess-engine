import { Board } from "../types/types";
import { getBishopMove } from "./bishopMoves";
import { getKingMoves } from "./kingMoves";
import { getKnightMoves } from "./knightMoves";
import { getPawnMoves } from "./pawnMoves";
import { getQueenMove } from "./queenMoves";
import { getRookMove } from "./rookMoves";

export function getAllBlackMove(board: Board): [number, number][] {
    let moves: [number, number][] = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j]
            if (piece && piece.startsWith('black')) {
                switch (piece) {
                    case 'black_pawn':
                        moves.push(...getPawnMoves(board, i, j, "white", false));
                        break;
                    case 'black_rook':
                        moves.push(...getRookMove(board, i, j, "white", "black"));
                        break;
                    case 'black_king':
                        moves.push(...getKingMoves(board, i, j, "white"));
                        break;
                    case 'black_queen':
                        moves.push(...getQueenMove(board, i, j, "white", "black"));
                        break;
                    case 'black_knight':
                        moves.push(...getKnightMoves(board, i, j, "white"));
                        break;
                    case 'black_bishop':
                        moves.push(...getBishopMove(board, i, j, "white", "black"));
                        break;
                    default:
                        console.log("error");
                }
            }
        }
    }

    return moves;
}
