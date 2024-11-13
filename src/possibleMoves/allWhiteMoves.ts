import { board, boardSize } from "../index"
import { getBishopMove } from "./bishopMoves";
import { getKingMoves } from "./kingMoves";
import { getKnightMoves } from "./knightMoves";
import { getPawnMoves } from "./pawnMoves";
import { getQueenMove } from "./queenMoves";
import { getRookMove } from "./rookMoves";

export function getAllWhiteMove(): [number, number][] {
    const allPossibleMoves: [number, number][] = [];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].startsWith("white_")) {
                switch (board[i][j].split("_")[1]) {
                    case "pawn":
                        allPossibleMoves.push(...getPawnMoves(i, j, "black", true));
                        break;
                    case "rook":
                        allPossibleMoves.push(...getRookMove(i, j, "black", "white"));
                        break;
                    case "king":
                        allPossibleMoves.push(...getKingMoves(i, j));
                        break;
                    case "queen":
                        allPossibleMoves.push(...getQueenMove(i, j, "black", "white"));
                        break;
                    case "knight":
                        allPossibleMoves.push(...getKnightMoves(i, j, "black"));
                        break;
                    case "bishop":
                        allPossibleMoves.push(...getBishopMove(i, j, "black", "white"));
                        break;
                    default:
                        console.log(board[i][j]);
                }
            }
        }
    }

    return allPossibleMoves;
}
