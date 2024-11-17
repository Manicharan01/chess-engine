import { possibleKingMoves } from './king';
import { isKingSafeorNot } from './possibleMoves/kingMoves';

export var board = [
    ["black_rook", "black_knight", "black_bishop", "black_queen", "black_king", "black_bishop", "black_knight", "black_rook"],
    ["black_pawn", "black_pawn", "black_pawn", "black_pawn", "black_pawn", "black_pawn", "black_pawn", "black_pawn"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["white_pawn", "white_pawn", "white_pawn", "white_pawn", "white_pawn", "white_pawn", "white_pawn", "white_pawn"],
    ["white_rook", "white_knight", "white_bishop", "white_queen", "white_king", "white_bishop", "white_knight", "white_rook"],
];
export const boardSize = 8;
var player1 = "white";
var player2 = "black";
export var current_player = player1;
export var previous_player = player2;

function moveChecker(previous_move: string, current_move: string): boolean {
    if (current_player != current_move.split("_")[0]) {
        return false
    } else {
        switch (current_move.split("_")[1][0]) {
            case "K":
                var row: number = 0;
                var col: number = 0;
                for (var i = 0; i < boardSize; i++) {
                    for (var j = 0; j < board[i].length; j++) {
                        if (board[i][j].startsWith(current_player + "_" + "king")) {
                            row = i;
                            col = j;
                        }
                    }
                }

            case "k":
                if (possibleKingMoves(current_move)) {
                    return true
                } else {
                    return false
                }
            default:
                return false
        }
    }

}
