import { isKingInCheck } from "../check/check";
import { Board } from "../types/types";

export function getKingMoves(board: Board, row: number, col: number, opponent: string): [number, number][] {
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

    return kingMoves.filter(([r, c]) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const piece = board[r][c]
            if (piece && piece.startsWith(opponent)) {
                return true
            } else if (piece === null) {
                return true
            }
        }

        return false
    });
}

export function possibleKingMoves(board: Board, isWhite: boolean): [number, number][] {
    if (isWhite) {
        let kingPosition: [number, number] = [-1, -1]
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = board[i][j]
                if (piece && piece === 'white_king') {
                    kingPosition = [i, j]
                    break
                }
            }
        }

        if (kingPosition[0] === -1) {
            throw new Error("King position is not found on board")
        }
        const kingMoves: [number, number][] = getKingMoves(board, kingPosition[0], kingPosition[1], "black")

        const newKingMoves = kingMoves.filter(move => {
            let psuedoBoard: Board = board
            psuedoBoard[move[0]][move[1]] = 'white_king'
            psuedoBoard[kingPosition[0]][kingPosition[1]] = null

            const isSafeOrNot: boolean = !isKingInCheck(psuedoBoard, 'white')
            psuedoBoard[move[0]][move[1]] = null
            psuedoBoard[kingPosition[0]][kingPosition[1]] = 'white_king'

            return isSafeOrNot
        })

        return newKingMoves
    } else {
        let kingPosition: [number, number] = [-1, -1]
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = board[i][j]
                if (piece && piece === 'black_king') {
                    kingPosition = [i, j]
                    break
                }
            }
        }

        if (kingPosition[0] === -1) {
            throw new Error("King position is not found on board")
        }
        const kingMoves: [number, number][] = getKingMoves(board, kingPosition[0], kingPosition[1], "white")

        const newKingMoves = kingMoves.filter(move => {
            let psuedoBoard: Board = board
            psuedoBoard[move[0]][move[1]] = 'black_king'
            psuedoBoard[kingPosition[0]][kingPosition[1]] = null

            const isSafeOrNot: boolean = !isKingInCheck(psuedoBoard, 'black')
            psuedoBoard[move[0]][move[1]] = null
            psuedoBoard[kingPosition[0]][kingPosition[1]] = 'black_king'

            return isSafeOrNot
        })

        return newKingMoves
    }

}

// export function truePossibleKingMoves(board: Board, current_player: string): [number, number][] {
//     let kingPosition: [number, number] = [0, 0];
//
//     for (let i = 0; i < 8; i++) {
//         for (let j = 0; j < 8; j++) {
//             const piece = board[i][j]
//             if (piece && piece === current_player + '_king') {
//                 kingPosition = [i, j];
//                 break;
//             }
//         }
//     }
//
//     let kingMoves: [number, number][] = current_player === "white" ? getKingMoves(board, kingPosition[0], kingPosition[1], "black") : getKingMoves(board, kingPosition[0], kingPosition[1], "white");
//
//     let legalMoves: [number, number][] = current_player === "white" ? kingMoves.filter(([r, c]) => possibleKingMoves(board, [r, c], "black")) : kingMoves.filter(([r, c]) => possibleKingMoves(board, [r, c], "white"));
//
//     return legalMoves;
// }

// export function getCastlingMoves(
//     current_player: string,
//     moveTracker: MoveTracker,
//     isSquareAttacked: (row: number, col: number, byColor: string) => boolean
// ): [number, number][] {
//     let castlingMoves: [number, number][] = [];
//     const rights = moveTracker.getCastlingRights();
//     const row = current_player === "white" ? 0 : 7;
//     const opponent = current_player === "white" ? "black" : "white";
//
//     if (isKingInCheck(current_player)) return castlingMoves;
//
//     if ((current_player === "white" && rights.whiteKingSide) ||
//         (current_player === "black" && rights.blackKingSide)) {
//         if (board[row][5] === null &&
//             board[row][6] === null &&
//             !isSquareAttacked(row, 4, opponent) &&
//             !isSquareAttacked(row, 5, opponent) &&
//             !isSquareAttacked(row, 6, opponent)) {
//             castlingMoves.push([row, 6]);
//         }
//     }
//
//     if ((current_player === "white" && rights.whiteQueenSide) ||
//         (current_player === "black" && rights.blackQueenSide)) {
//         if (board[row][3] === null &&
//             board[row][2] === null &&
//             board[row][1] === null &&
//             !isSquareAttacked(row, 4, opponent) &&
//             !isSquareAttacked(row, 3, opponent) &&
//             !isSquareAttacked(row, 2, opponent)) {
//             castlingMoves.push([row, 2]);
//         }
//     }
//
//     return castlingMoves;
// }
