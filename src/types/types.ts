/**
 * Represents the castling rights of a player on the board
 */
export interface CastlingRights {
    whiteKingSide: boolean;
    whiteQueenSide: boolean;
    blackKingSide: boolean;
    blackQueenSide: boolean;
}

/**
 * Represents the state of the game
 */
export type Piece = 'white_pawn' | 'white_rook' | 'white_knight' | 'white_bishop' | 'white_queen' | 'white_king' | 'black_pawn' | 'black_rook' | 'black_knight' | 'black_bishop' | 'black_queen' | 'black_king' | null;

/**
 * Represents the state of the board
 */
export type Board = Piece[][]

/**
 * Represents a position on the board
 * @property row The row of the position
 * @property col The column of the position
 */
export interface Position {
    row: number;
    col: number;
}

/**
 * Represents a move made on the board, from one position to another
 */
export interface Move {
    from: Position;
    to: Position
};

/**
 * Represents a direction on the board
 */
export interface Direction {
    row: number;
    col: number;
}

export type NonNullPiece = Exclude<Piece, null>;

export type AllMoves = {
    [key in NonNullPiece]: Position[];
}

export interface PieceMove {
    from: Position;
    to: Position;
    moveNumber: number;
    timestamp: Date;
    isCapture: boolean;
    capturedPiece?: string;
}

export interface PieceTracker {
    id: string;
    type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
    color: 'white' | 'black';
    moves: PieceMove[];
    isCaptured: boolean;
    capturedBy?: string;
    originalPosition: Position;
}

