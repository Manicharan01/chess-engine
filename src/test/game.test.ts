import { Game, Piece } from "../core";
import { intializeBoard } from "../game-logic";

describe("Game", () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    it("should handle pawn promotion", () => {
        game.board.setPiece({ row: 7, col: 4 }, new Piece("white", "king", { row: 7, col: 4 }, { row: 7, col: 4 }, false));
        game.board.setPiece({ row: 0, col: 4 }, new Piece("black", "king", { row: 0, col: 4 }, { row: 0, col: 4 }, false));
        game.board.setPiece({ row: 1, col: 0 }, new Piece("white", "pawn", { row: 1, col: 0 }, { row: 1, col: 0 }, false));
        game.makeMove({ from: { row: 1, col: 0 }, to: { row: 0, col: 0 } });
        const piece = game.board.getPiece({ row: 0, col: 0 });
        expect(piece?.type).toBe("queen");
    });

    it("should handle en passant", () => {
        game.board.setPiece({ row: 7, col: 4 }, new Piece("white", "king", { row: 7, col: 4 }, { row: 7, col: 4 }, false));
        game.board.setPiece({ row: 0, col: 4 }, new Piece("black", "king", { row: 0, col: 4 }, { row: 0, col: 4 }, false));
        game.board.setPiece({ row: 3, col: 3 }, new Piece("white", "pawn", { row: 3, col: 3 }, { row: 3, col: 3 }, false));
        game.board.setPiece({ row: 1, col: 4 }, new Piece("black", "pawn", { row: 1, col: 4 }, { row: 1, col: 4 }, false));
        game.currentPlayer = "black";
        game.makeMove({ from: { row: 1, col: 4 }, to: { row: 3, col: 4 } });
        game.enPassantSquare = { row: 2, col: 4 };
        game.currentPlayer = "white";
        game.makeMove({ from: { row: 3, col: 3 }, to: { row: 2, col: 4 } });
        const piece = game.board.getPiece({ row: 3, col: 4 });
        expect(piece).toBeNull();
    });

    it("should handle castling", () => {
        game.board.setPiece({ row: 7, col: 4 }, new Piece("white", "king", { row: 7, col: 4 }, { row: 7, col: 4 }, false));
        game.board.setPiece({ row: 7, col: 7 }, new Piece("white", "rook", { row: 7, col: 7 }, { row: 7, col: 7 }, false));
        game.makeMove({ from: { row: 7, col: 4 }, to: { row: 7, col: 6 } });
        const king = game.board.getPiece({ row: 7, col: 6 });
        const rook = game.board.getPiece({ row: 7, col: 5 });
        expect(king?.type).toBe("king");
        expect(rook?.type).toBe("rook");
    });
});
