import { possibleKingMoves } from './king';

var board = [8][8];
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
