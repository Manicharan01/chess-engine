/**
 * The size of the chess board.
 */
export const BOARD_SIZE = 8;

/**
 * A map of file characters to their corresponding column index.
 */
export const FILES: { [key: string]: number } = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7 };

/**
 * A map of piece characters to their corresponding piece type.
 */
export const PIECES: { [key: string]: string } = { 'p': 'pawn', 'r': 'rook', 'n': 'knight', 'b': 'bishop', 'q': 'queen', 'k': 'king' };
