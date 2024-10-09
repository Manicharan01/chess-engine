import { getAllBlackMoves } from "./blackMove";
import { getAllWhiteMoves } from "./whiteMoves";

export function possibleKingMoves(move: string): boolean {

    if (move.split("_")[0] === "white") {
        if (getAllBlackMoves(move)) {
            return true
        }

        return false
    } else {
        if (getAllWhiteMoves(move)) {
            return true
        }

        return false
    }

}
