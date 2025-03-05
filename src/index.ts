import { isKingInCheck } from "./check/check";
import { enPassantTest, isValidBishopMove, isValidKingMove, isValidKnightMove, isValidPawnMove, isValidQueenMove, isValidRookMove } from "./helper";
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
        "white": { kingSide: true, queenSide: true },
        "black": { kingSide: true, queenSide: true }
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

export class Game {
    gameState: GameState;

    constructor() {
        this.gameState = new GameState();
    }
}

const game = new Game();
enPassantTest(game);
game.gameState.makeMove({ from: { row: 6, col: 0 }, to: { row: 4, col: 0 } });
console.log(game.gameState.moveHistory)
game.gameState.makeMove({ from: { row: 4, col: 1 }, to: { row: 5, col: 0 } });
// game.gameState.board.display();
