import { isKingInCheck } from "./check/check";
import { enPassantTest, intializeBoard, intializeCastlingBoard, isValidBishopMove, isValidKingMove, isValidKnightMove, isValidPawnMove, isValidQueenMove, isValidRookMove } from "./helper";
import { Color, Move, Position } from "./types/types";

/**
 * The size of the chess board.
 */
export const BOARD_SIZE = 8;

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

/**
 * Represents the state of the game.
 */
export class GameState {
    /** The chess board. */
    board: Board;
    /** The current player. */
    currentPlayer: string;
    /** The history of moves made in the game. */
    moveHistory: Move[] = [];
    /** The castling rights for each player. */
    castlingRights: { [color: string]: { kingSide: boolean, queenSide: boolean } } = {
        "white": { kingSide: true, queenSide: true },
        "black": { kingSide: true, queenSide: true }
    };
    /** The square that can be captured by en passant, or null if there is no such square. */
    enPassantSquare: Position | null = null;

    /**
     * Creates a new game state.
     * @param board The initial state of the board.
     */
    constructor(board: Board = new Board()) {
        this.board = board;
        this.currentPlayer = "white";
    }

    /**
     * Checks if a move is valid.
     * @param move The move to check.
     * @returns True if the move is valid, false otherwise.
     */
    isValidMove(move: Move): boolean {
        const { from, to } = move;
        const piece = this.board.getPiece(from)

        if (!piece || piece.color !== this.currentPlayer || piece.isCaptured) {
            console.error("Invalid player or piece");
            return false;
        }

        const validateMove = this.validateMoveByPieceType(move, piece);
        if (!validateMove) return false;

        const clonedBoard = this.board.clone();
        const clonedPiece = clonedBoard.getPiece(from);
        if (clonedPiece) {
            clonedBoard.setPiece(to, clonedPiece);
            clonedBoard.setPiece(from, null);
            clonedPiece.presentPosition = to;
        }

        if (isKingInCheck(clonedBoard, piece!.color === "white")) {
            console.error("Puts king in check");
            return false;
        }

        return true;
    }

    /**
     * Validates a move based on the piece type.
     * @param move The move to validate.
     * @param piece The piece to validate the move for.
     * @returns True if the move is valid, false otherwise.
     * @private
     */
    private validateMoveByPieceType(move: Move, piece: Piece) {
        switch (piece!.type) {
            case "pawn": return isValidPawnMove(move, this.board, this.currentPlayer === "white", this.moveHistory);
            case "rook": return isValidRookMove(move, this.board);
            case "knight": return isValidKnightMove(move, this.board);
            case "bishop": return isValidBishopMove(move, this.board);
            case "queen": return isValidQueenMove(move, this.board);
            case "king": return isValidKingMove(move, this.board);
            default: return false;
        }
    }

    /**
     * Makes a move on the board.
     * @param move The move to make.
     * @throws An error if the move is not valid.
     */
    makeMove(move: Move) {
        if (!this.isValidMove(move)) throw new Error("Not a valid move");

        this.executeMove(move);
    }

    /**
     * Executes a move on the board.
     * @param move The move to execute.
     * @throws An error if the move is invalid.
     * @private
     */
    executeMove(move: Move) {
        const { from, to } = move;
        const piece = this.board.getPiece(from)

        let opponentPiece = this.board.getPiece(to);
        if (opponentPiece && opponentPiece.color === this.currentPlayer) {
            console.error("Moving to an occupied position which is occupied by same player");
            throw new Error("Moving to an occupied position which is occupied by same player")
        };
        if (opponentPiece && opponentPiece.isCaptured) {
            console.error("Moving to an occupied position which is captured");
            throw new Error("Moving to an occupied position which is captured")
        };
        if (opponentPiece) opponentPiece.isCaptured = true;

        if (piece?.type === "king" || piece?.type === "rook") {
            this.updateCastlingRights(move);
        }

        if (piece?.type === "king" && Math.abs(to.col - from.col) === 2) {
            const rookSide = to.col === 6 ? 7 : 0;
            const rookEndCol = to.col === 6 ? 5 : 3;
            const rook = this.board.getPiece({ row: from.row, col: rookSide });

            if (rook) {
                this.board.setPiece({ row: from.row, col: rookEndCol }, rook);
                this.board.setPiece({ row: from.row, col: rookSide }, null);
            }
        }

        if (this.enPassantSquare && this.enPassantSquare.row === to.row && this.enPassantSquare.col === to.col) {
            let enPassantedPiecePos = this.moveHistory[this.moveHistory.length - 1].to
            this.board.setPiece(enPassantedPiecePos, null);
        }

        this.board.setPiece(to, piece);
        this.board.setPiece(from, null);
        this.moveHistory.push(move);

        if (piece?.type === "pawn" && Math.abs(from.row - to.row) === 2) {
            this.enPassantSquare = { row: (to.row + from.row) / 2, col: from.col };
        } else {
            this.enPassantSquare = null;
        }

        this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    }

    /**
     * Updates the castling rights based on the move that was made.
     * @param move The move that was made.
     * @private
     */
    updateCastlingRights(move: Move) {
        const { from, to } = move;
        const piece = this.board.getPiece(from);
        if (piece?.type === "king") {
            this.castlingRights[piece?.color] = {
                kingSide: false,
                queenSide: false
            };
        }
        if (piece?.type === "rook") {
            const rookSide = piece?.startPosition?.col === 0 ? "queenSide" :
                (piece?.startPosition?.col === 7 ? "kingSide" : null);

            if (rookSide) {
                this.castlingRights[piece?.color][rookSide] = false;
            }
        }
    }
}

/**
 * Represents a chess game.
 */
export class Game {
    /** The game state. */
    gameState: GameState;

    /**
     * Creates a new game.
     */
    constructor() {
        this.gameState = new GameState();
    }
}

/**
 * @hidden
 */
const game = new Game();
// intializeBoard(game)
// game.gameState.makeMove({ from: { row: 6, col: 3 }, to: { row: 4, col: 3 } })
// game.gameState.makeMove({ from: { row: 1, col: 0 }, to: { row: 3, col: 0 } })
// game.gameState.makeMove({ from: { row: 4, col: 3 }, to: { row: 3, col: 3 } })
// game.gameState.makeMove({ from: { row: 1, col: 2 }, to: { row: 3, col: 2 } })
// game.gameState.makeMove({ from: { row: 3, col: 3 }, to: { row: 2, col: 2 } })
intializeCastlingBoard(game)
game.gameState.board.display()
