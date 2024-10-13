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

export function getKingMoves(row: number, col: number): [number, number][] {
    const kingMoves: [number, number][] = directions.map(dir => [row + dir.row, col + dir.col]);

    return kingMoves.filter(([r, c]) => r >= 0 && r < boardSize && c >= 0 && c < boardSize);
}
