import { Position } from "./types/types";

export interface CastlingMove {
    kingFrom: Position;
    kingTo: Position;
    rookFrom: Position;
    rookTo: Position;
    side: "kingSide" | "queenSide";
}
//
// export function getCastlingMoves(color: string, moveTracker: MoveTracker): CastlingMove[] {
//     const castlingMoves: CastlingMove[] = [];
//     const rights = moveTracker.getCastlingRights();
//     const row = color === "white" ? 0 : 7;
//
//     if ((color === "white" && rights.whiteKingSide) ||
//         (color === "black" && rights.blackKingSide)) {
//         if (isCastlingPossible(color, 'kingSide')) {
//             castlingMoves.push({
//                 kingFrom: { row: row, col: 4 },
//                 kingTo: { row: row, col: 6 },
//                 rookFrom: { row: row, col: 7 },
//                 rookTo: { row: row, col: 5 }
//             });
//         }
//     }
// }
