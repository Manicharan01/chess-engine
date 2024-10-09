import { possibleKingMoves } from './king';

export var board = [
    ["black_rook", "black_knight", "black_bishop", "black_queen", "black_king", "black_bishop", "black_knight", "black_rook"],
    ["black_pawn", "black_pawn", "black_pawn", "black_pawn", "black_pawn", "black_pawn", "black_pawn", "black_pawn", "black_pawn"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["white_pawn", "white_pawn", "white_pawn", "white_pawn", "white_pawn", "white_pawn", "white_pawn", "white_pawn", "white_pawn"],
    ["white_rook", "white_knight", "white_bishop", "white_queen", "white_king", "white_bishop", "white_knight", "white_rook"]
];
var player1 = "white";
var player2 = "black";
var current_player = player1;
var previous_player = "";

function moveChecker(previous_move: string, current_move: string): boolean {
    if (current_player != current_move.split("_")[0]) {
        return false
    } else {
        switch (current_move.split("_")[1][0]) {
            case "K":
                if (possibleKingMoves(current_move)) {
                    return true
                } else {
                    return false
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

moveChecker("black_pe5", "white_kc3");
