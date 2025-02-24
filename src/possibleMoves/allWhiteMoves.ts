import { getBishopMove } from "./bishopMoves";
import { getKingMoves } from "./kingMoves";
import { getKnightMoves } from "./knightMoves";
import { getPawnMoves } from "./pawnMoves";
import { getQueenMove } from "./queenMoves";
import { getRookMove } from "./rookMoves";
import { Board } from "../types/types";

export function getAllWhiteMove(board: Board): [number, number][] {
    const moves: [number, number][] = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j]
            if (piece && piece.startsWith('white')) {
                switch (piece) {
                    case 'white_pawn':
                        moves.push(...getPawnMoves(board, i, j, "black", true));
                        break;
                    case 'white_rook':
                        moves.push(...getRookMove(board, i, j, "black", "white"));
                        break;
                    case 'white_king':
                        moves.push(...getKingMoves(board, i, j, "black"));
                        break;
                    case 'white_queen':
                        moves.push(...getQueenMove(board, i, j, "black", "white"));
                        break;
                    case 'white_knight':
                        moves.push(...getKnightMoves(board, i, j, "black"));
                        break;
                    case 'white_bishop':
                        moves.push(...getBishopMove(board, i, j, "black", "white"));
                        break;
                    default:
                        console.log("error");
                }
            }
        }
    }

    return moves;
}
