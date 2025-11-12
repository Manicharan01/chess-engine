/**
 * Represents the castling rights for both players.
 * @property whiteKingSide - Whether white can castle kingside.
 * @property whiteQueenSide - Whether white can castle queenside.
 * @property blackKingSide - Whether black can castle kingside.
 * @property blackQueenSide - Whether black can castle queenside.
 */
export interface CastlingRights {
    whiteKingSide: boolean;
    whiteQueenSide: boolean;
    blackKingSide: boolean;
    blackQueenSide: boolean;
}

/**
 * Represents a piece on the board.
 * It can be one of the 12 piece types or null if the square is empty.
 */
export type PieceType = 'white_pawn' | 'white_rook' | 'white_knight' | 'white_bishop' | 'white_queen' | 'white_king' | 'black_pawn' | 'black_rook' | 'black_knight' | 'black_bishop' | 'black_queen' | 'black_king' | null;

/**
 * Represents the chess board as a 2D array of pieces.
 */
export type BoardType = PieceType[][]

/**
 * Represents a position on the board.
 * @property row - The row of the position (0-7).
 * @property col - The column of the position (0-7).
 */
export interface Position {
    row: number;
    col: number;
}

/**
 * Represents a move made on the board, from a starting position to an ending position.
 * @property from - The starting position of the move.
 * @property to - The ending position of the move.
 */
export interface Move {
    from: Position;
    to: Position
};

/**
 * Represents a map of all possible moves for a piece at a given position.
 * The key is the starting position of the piece, and the value is an array of possible ending positions.
 */
export type Moves = Map<Position, Position[]>;

/**
 * Represents a direction on the board as a change in row and column.
 * @property row - The change in the row direction (e.g., -1 for up, 1 for down).
 * @property col - The change in the column direction (e.g., -1 for left, 1 for right).
 */
export interface Direction {
    row: number;
    col: number;
}

/**
 * Represents the color of a player.
 */
export type Color = 'white' | 'black';
