import { board, boardSize } from "../index"

export function getAllWhiteMove(): [number, number][] {
    const allPossibleMoves: [number, number][] = [];

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j].startsWith("white_")) {
                allPossibleMoves.push([i, j]);
            }
        }
    }

    return allPossibleMoves;
}
