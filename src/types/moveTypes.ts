export interface Position {
    row: number;
    col: number;
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
