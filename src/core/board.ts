import { Piece } from "./piece";
import { Position } from "./types/types";

/**
 * Represents the chess board.
 */
export class Board {
    /** The 2D array of pieces on the board. */
    board: (Piece | null)[][];

    /**
     * Creates a new board.
     * @param board The initial state of the board.
     */
    constructor(board: (Piece | null)[][] = this.board = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null))) {
        this.board = board;
    }

    /**
     * Sets a piece at a given position on the board.
     * @param pos The position to set the piece at.
     * @param piece The piece to set.
     */
    setPiece(pos: Position, piece: Piece | null) {
        this.board[pos.row][pos.col] = piece;
        if (piece) {
            piece.startPosition = pos;
            piece.presentPosition = pos;
        }
    }

    /**
     * Gets all the pieces on the board.
     * @returns The 2D array of pieces on the board.
     */
    getPieces() {
        return this.board;
    }

    /**
     * Gets the piece at a given position on the board.
     * @param pos The position to get the piece from.
     * @returns The piece at the given position, or null if there is no piece.
     */
    getPiece(pos: Position): Piece | null {
        return this.board[pos.row][pos.col];
    }

    /**
     * Updates the position of a piece on the board.
     * @param pos The new position of the piece.
     * @throws An error if there is no piece at the given position.
     */
    updatePiece(pos: Position) {
        const piece = this.getPiece(pos);
        if (!piece) throw new Error("Invalid piece id");

        this.board[pos.row][pos.col] = piece;
        piece.presentPosition = pos;
    }

    /**
     * Displays the board in the console.
     */
    display() {
        console.log(this.board);
    }

    /**
     * Creates a deep copy of the board.
     * @returns A new board instance that is a deep copy of the original board.
     */
    clone(): Board {
        return new Board(this.board.map(row => row.map(piece => piece ? { ...piece } : null)));
    }
}
