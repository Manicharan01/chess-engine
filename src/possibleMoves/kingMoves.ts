import { board } from "..";
import { getAllBlackMove } from "./allBlackMoves";
import { getAllWhiteMove } from "./allWhiteMoves";

export function getKingMoves(row: number, col: number, opponent: string): [number, number][] {
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

    return kingMoves.filter(([r, c]) => r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c].startsWith(opponent));
}

export function possibleKingMoves(kingMove: [number, number], opponentColor: string): boolean {
    let opponentAllMoves: [number, number][] = [];
    let legalMove: boolean = true;

    if (opponentColor === "white") {
        opponentAllMoves = getAllBlackMove();
    } else if (opponentColor === "black") {
        opponentAllMoves = getAllWhiteMove();
    } else {
        console.log("Wrong opponent color");
    }

    opponentAllMoves.map(([r, c]) => {
        if (r === kingMove[0] && c === kingMove[1]) {
            legalMove = false;
        }
    })

    return legalMove;
}

export function truePossibleKingMoves(current_player: string): [number, number][] {
    let kingPosition: [number, number] = [0, 0];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === `{current_player}_king`) {
                kingPosition = [i, j];
                break;
            }
        }
    }

    let kingMoves: [number, number][] = current_player === "white" ? getKingMoves(kingPosition[0], kingPosition[1], "black") : getKingMoves(kingPosition[0], kingPosition[1], "white");

    let legalMoves: [number, number][] = current_player === "white" ? kingMoves.filter(([r, c]) => possibleKingMoves([r, c], "black")) : kingMoves.filter(([r, c]) => possibleKingMoves([r, c], "white"));

    return legalMoves;
}
