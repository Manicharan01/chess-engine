import { Game } from "../core";
import { Piece } from "../core/piece";
import { BOARD_SIZE } from "../constants";

/**
 * Initializes the board for testing the en passant rule.
 * @param game The game instance.
 * @hidden
 */
export function enPassantTest(game: Game) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            game.board.setPiece({ row: i, col: j }, null);
        }
    }

    const whitePawn = new Piece("white", 'pawn', { row: 6, col: 0 }, { row: 6, col: 0 }, false);
    game.board.setPiece({ row: 6, col: 0 }, whitePawn);
    const blackPawn = new Piece("black", 'pawn', { row: 4, col: 1 }, { row: 4, col: 1 }, false);
    game.board.setPiece({ row: 4, col: 1 }, blackPawn);
    const whiteKing = new Piece("white", 'king', { row: 7, col: 4 }, { row: 7, col: 4 }, false);
    game.board.setPiece({ row: 7, col: 4 }, whiteKing);
    const blackKing = new Piece("black", 'king', { row: 0, col: 4 }, { row: 0, col: 4 }, false);
    game.board.setPiece({ row: 0, col: 4 }, blackKing);

    game.currentPlayer = "white";
}

/**
 * Initializes the board for testing if a square is being attacked.
 * @param game The game instance.
 * @hidden
 */
export function checkingIsSquareBeingAttacked(game: Game) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            game.board.setPiece({ row: i, col: j }, null);
        }
    }

    const whiteKing = new Piece("white", 'king', { row: 7, col: 0 }, { row: 7, col: 0 }, false);
    game.board.setPiece({ row: 7, col: 0 }, whiteKing);
    const blackKing = new Piece("black", 'king', { row: 7, col: 6 }, { row: 7, col: 6 }, false);
    game.board.setPiece({ row: 7, col: 6 }, blackKing);
}

/**
 * Initializes the board for testing castling.
 * @param game The game instance.
 * @hidden
 */
export function intializeCastlingBoard(game: Game) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            game.board.setPiece({ row: i, col: j }, null);
        }
    }

    const whiteKing = new Piece("white", 'king', { row: 7, col: 4 }, { row: 7, col: 4 }, false);
    game.board.setPiece({ row: 7, col: 4 }, whiteKing);
    const blackKing = new Piece("black", 'king', { row: 0, col: 4 }, { row: 0, col: 4 }, false);
    game.board.setPiece({ row: 0, col: 4 }, blackKing);
    const whiteRook = new Piece("white", 'rook', { row: 7, col: 7 }, { row: 7, col: 7 }, false);
    game.board.setPiece({ row: 7, col: 7 }, whiteRook);
}
