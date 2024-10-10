interface Move {
    h: number,
    v: number,
}

export function knightPossibleMoves(i: number, j: number) {
    let knightMoves: { [key: number]: Move } = {};

    if (j > 1 && j < 8) {
        if (i - 2 >= 0) {
            knightMoves[0] = { h: i - 2, v: j - 1 };
            knightMoves[1] = { h: i - 2, v: j + 1 };
        }
        if (i + 2 >= 0) {
            knightMoves[0] = { h: i + 2, v: j - 1 };
            knightMoves[1] = { h: i + 2, v: j + 1 };
        }
    }
}
