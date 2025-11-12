/**
 * A map of file characters to their corresponding column index.
 * @hidden
 */
const FILES: { [key: string]: number } = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7 };

/**
 * A map of piece characters to their corresponding piece type.
 * @hidden
 */
const PIECES: { [key: string]: string } = { 'p': 'pawn', 'r': 'rook', 'n': 'knight', 'b': 'bishop', 'q': 'queen', 'k': 'king' };

/**
 * Parses a move in algebraic notation and returns the board coordinates.
 * @param move The move in algebraic notation (e.g., "e4").
 * @returns A tuple containing the row and column of the move.
 * @throws An error if the move is invalid.
 */
export function parseMove(move: string): [number, number] {
    move.trim();
    if (move.length < 2 || move.length > 5) throw new Error("Invalid move");

    const file = move.charAt(move.length - 2).toLowerCase();
    const rank = move.charAt(move.length - 1);

    if (!FILES.hasOwnProperty(file) || !/^[1-8]$/.test(rank)) throw new Error("Invalid move");

    return [parseInt(rank) - 1, FILES[file]];
}

/**
 * Gets the piece type from a move in algebraic notation.
 * @param move The move in algebraic notation (e.g., "Nf3").
 * @returns The piece type (e.g., "knight").
 * @throws An error if the move is invalid.
 */
export function getPiece(move: string): string {
    const piece = move.charAt(0).toLowerCase();

    if (!PIECES.hasOwnProperty(piece)) throw new Error("Invalid move");

    return PIECES[piece];
}
