export interface CastlingRights {
    whiteKingSide: boolean;
    whiteQueenSide: boolean;
    blackKingSide: boolean;
    blackQueenSide: boolean;
}

export type Piece = 'white_pawn' | 'white_rook' | 'white_knight' | 'white_bishop' | 'white_queen' | 'white_king' | 'black_pawn' | 'black_rook' | 'black_knight' | 'black_bishop' | 'black_queen' | 'black_king' | null;

export type Board = Piece[][]

export type Position = [number, number]

export type Move = [Position, Position]
