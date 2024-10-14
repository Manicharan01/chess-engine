export function getKnightMoves(row: number, col: number): [number, number][] {
    const knightMoves: [number, number][] = [
        [row + 2, col + 1], [row + 2, col - 1],
        [row - 2, col + 1], [row - 2, col - 1],
        [row + 1, col + 2], [row + 1, col - 2],
        [row - 1, col + 2], [row - 1, col - 2]
    ];

    return knightMoves.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
}
