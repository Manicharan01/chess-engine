import { board, boardSize } from "../index"

export function getAllBlackMove(): [number, number][] {
    const allPossibleMoves: [number, number][] = [];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].startsWith("black_")) {
                allPossibleMoves.push([i, j]);
            }
        }
    }

    return allPossibleMoves;
}
