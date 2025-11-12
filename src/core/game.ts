import { isKingInCheck, isValidBishopMove, isValidKingMove, isValidKnightMove, isValidPawnMove, isValidQueenMove, isValidRookMove } from "../game-logic";
import { Board } from "./board";
import { Piece } from "./piece";
import { Move, Position } from "./types/types";

/**
 * Represents the state of the game.
 */
export class Game {
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
