export function getBishopMove(row: number, col: number): [number, number][] {
    const moves: [number, number][] = [];

    for (let i = 0; i < 8; i++) {
        if (row + i < 8 && col + i < 8) moves.push([row + i, col + i]);
        if (row - i >= 0 && col + i < 8) moves.push([row - i, col + i]);
        if (row + i < 8 && col - i >= 0) moves.push([row + i, col - i]);
        if (row - i >= 0 && col - i >= 0) moves.push([row - i, col - i]);
    }

    return moves;
}
