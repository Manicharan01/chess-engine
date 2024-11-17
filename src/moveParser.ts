const FILES: { [key: string]: number } = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7 };
const PIECES: { [key: string]: string } = { 'p': 'pawn', 'r': 'rook', 'n': 'knight', 'b': 'bishop', 'q': 'queen', 'k': 'king' };

export function parseMove(move: string): [number, number] {
    move.trim();
    if (move.length < 2 || move.length > 5) throw new Error("Invalid move");

    const file = move.charAt(move.length - 2).toLowerCase();
    const rank = move.charAt(move.length - 1);

    if (!FILES.hasOwnProperty(file) || !/^[1-8]$/.test(rank)) throw new Error("Invalid move");

    return [parseInt(rank) - 1, FILES[file]];
}

export function getPiece(move: string): string {
    const piece = move.charAt(0).toLowerCase();

    if (!PIECES.hasOwnProperty(piece)) throw new Error("Invalid move");

    return PIECES[piece];
}
