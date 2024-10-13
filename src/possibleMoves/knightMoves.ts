export function getKnightMoves(row: number, col: number): [number, number][] {
    //let knightMoves: { [key: number]: Move } = {};

    //if (j > 1 && j < 8) {
    //    if (i - 2 >= 0) {
    //        knightMoves[0] = { h: i - 2, v: j - 1 };
    //        knightMoves[1] = { h: i - 2, v: j + 1 };
    //    }
    //    if (i + 2 >= 0) {
    //        knightMoves[0] = { h: i + 2, v: j - 1 };
    //        knightMoves[1] = { h: i + 2, v: j + 1 };
    //    }
    //}

    const knightMoves: [number, number][] = [
        [row + 2, col + 1], [row + 2, col - 1],
        [row - 2, col + 1], [row - 2, col - 1],
        [row + 1, col + 2], [row + 1, col - 2],
        [row - 1, col + 2], [row - 1, col - 2]
    ];

    return knightMoves.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
}
