import { isKingInCheck } from "./check/check";
import { isValidBishopMove, isValidKingMove, isValidKnightMove, isValidPawnMove, isValidQueenMove, isValidRookMove } from "./helper";
import { Color, Move, Position } from "./types/types";

export const BOARD_SIZE = 8;

export class Piece {
    color: Color;
    type: string;
    startPosition: Position | null;
    presentPosition: Position | null;
    isCaptured: boolean;

    constructor(color: Color, type: string, startPosition: Position, presentPosition: Position, isCaptured: boolean) {
        this.color = color;
        this.type = type;
        this.startPosition = startPosition;
        this.presentPosition = presentPosition;
        this.isCaptured = isCaptured;
    }
}

export class Board {
    board: (Piece | null)[][];

    constructor(board: (Piece | null)[][] = this.board = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null))) {
        this.board = board;
    }

    setPiece(pos: Position, piece: Piece | null) {
        this.board[pos.row][pos.col] = piece;
        if (piece) {
            piece.startPosition = pos;
            piece.presentPosition = pos;
        }
    }

    getPieces() {
        return this.board;
    }

    getPiece(pos: Position): Piece | null {
        return this.board[pos.row][pos.col];
    }

    updatePiece(pos: Position) {
        const piece = this.getPiece(pos);
        if (!piece) throw new Error("Invalid piece id");

        this.board[pos.row][pos.col] = piece;
        piece.presentPosition = pos;
    }

    display() {
        console.log(this.board);
    }

    clone(): Board {
        return new Board(this.board.map(row => row.map(piece => piece ? { ...piece } : null)));
    }
}

export class GameState {
    board: Board;
    currentPlayer: string;
    moveHistory: Move[] = [];
    castlingRights: { [color: string]: { kingSide: boolean, queenSide: boolean } } = {
        white: { kingSide: true, queenSide: true },
        black: { kingSide: true, queenSide: true }
    };
    enPassantSquare: Position | null = null;

    constructor(board: Board = new Board()) {
        this.board = board;
        this.currentPlayer = "white";
    }

    isValidMove(move: Move): boolean {
        const { from, to } = move;
        const piece = this.board.getPiece(from)

        if (!piece || piece.color !== this.currentPlayer || piece.isCaptured) {
            console.error("Invalid player or piece");
            return false;
        }

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

        switch (piece!.type) {
            case "pawn": return isValidPawnMove(move, this.board, this.currentPlayer === "white")
            case "rook": return isValidRookMove(move, this.board);
            case "knight": return isValidKnightMove(move, this.board);
            case "bishop": return isValidBishopMove(move, this.board);
            case "queen": return isValidQueenMove(move, this.board);
            case "king": return isValidKingMove(move, this.board);
            default: return false;
        }
    }

    makeMove(move: Move) {
        if (!this.isValidMove(move)) throw new Error("Not a valid move");

        this.executeMove(move);
    }

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
        this.board.setPiece(to, piece);
        this.board.setPiece(from, null);
        this.moveHistory.push(move);
        this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    }
}

export class Game {
    gameState: GameState;

    constructor() {
        this.gameState = new GameState();
    }
}
