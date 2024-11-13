import { board, boardSize } from "../index"
import { getBishopMove } from "./bishopMoves";
import { getKingMoves } from "./kingMoves";
import { getKnightMoves } from "./knightMoves";
import { getPawnMoves } from "./pawnMoves";
import { getQueenMove } from "./queenMoves";
import { getRookMove } from "./rookMoves";

export function getAllBlackMove(): [number, number][] {
    let allPossibleMoves: [number, number][] = [];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].startsWith("black_")) {
                switch (board[i][j].split("_")[1]) {
                    case "pawn":
                        allPossibleMoves.push(...getPawnMoves(i, j, "white", false));
                        break;
                    case "rook":
                        allPossibleMoves.push(...getRookMove(i, j, "white", "black"));
                        break;
                    case "king":
                        allPossibleMoves.push(...getKingMoves(i, j));
                        break;
                    case "queen":
                        allPossibleMoves.push(...getQueenMove(i, j, "white", "black"));
                        break;
                    case "knight":
                        allPossibleMoves.push(...getKnightMoves(i, j, "white"));
                        break;
                    case "bishop":
                        allPossibleMoves.push(...getBishopMove(i, j, "white", "black"));
                        break;
                    default:
                        console.log(board[i][j]);
                }
            }
        }
    }

    return allPossibleMoves;
}

console.log(getAllBlackMove());
