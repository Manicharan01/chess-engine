import { Color, Position } from "./types/types";

/**
 * Represents a piece on the board.
 */
export class Piece {
    /** The color of the piece. */
    color: Color;
    /** The type of the piece (e.g., "pawn", "rook"). */
    type: string;
    /** The starting position of the piece. */
    startPosition: Position | null;
    /** The current position of the piece. */
    presentPosition: Position | null;
    /** Whether the piece has been captured. */
    isCaptured: boolean;

    /**
     * Creates a new piece.
     * @param color The color of the piece.
     * @param type The type of the piece.
     * @param startPosition The starting position of the piece.
     * @param presentPosition The current position of the piece.
     * @param isCaptured Whether the piece has been captured.
     */
    constructor(color: Color, type: string, startPosition: Position, presentPosition: Position, isCaptured: boolean) {
        this.color = color;
        this.type = type;
        this.startPosition = startPosition;
        this.presentPosition = presentPosition;
        this.isCaptured = isCaptured;
    }
}
