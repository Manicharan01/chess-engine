export function getRookMove(row: number, col: number): [number, number][] {
    const moves: [number, number][] = [];

    for (let i = 0; i < 8; i++) {
        if (i !== row) moves.push([i, col]);
        if (i !== col) moves.push([row, i]);
    }

    return moves;
}
