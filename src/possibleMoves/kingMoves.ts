import { board } from "..";
import { getAllBlackMove } from "./allBlackMoves";
import { getAllWhiteMove } from "./allWhiteMoves";

export function getKingMoves(row: number, col: number): [number, number][] {
    const boardSize = 8;

    const directions = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        { row: -1, col: -1 },
        { row: -1, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 1 }
    ];

    const kingMoves: [number, number][] = directions.map(dir => [row + dir.row, col + dir.col]);

    return kingMoves.filter(([r, c]) => r >= 0 && r < boardSize && c >= 0 && c < boardSize);
}

export function isKingSafeorNot(current_player: string, row: number, col: number, move: string): boolean {
    const kingMoves: [number, number][] = getKingMoves(row, col);

    let moveIsThere: boolean = false;
    kingMoves.map(([r, c]) => {
        if (r === row && c === col) {
            moveIsThere = true;
        } else {
            moveIsThere = false;
        }
    })

    if (moveIsThere) {
        let opponentAllMoves: [number, number][] = [];
        if (current_player === "white") {
            opponentAllMoves = getAllBlackMove();
        } else {
            opponentAllMoves = getAllWhiteMove();
        }

    } else {
        return false
    }
    return true
}
