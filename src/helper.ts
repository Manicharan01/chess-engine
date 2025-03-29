import { Game, Board, Piece, BOARD_SIZE } from "./index";
import { Move } from "./types/types";
import { isWithinBounds } from "./utils";

/**
 * Checks if the pawn can move forward
 * @param move
 * @param board the current board state
 * @param isWhite true if the player is white, false otherwise
 * @returns true if the pawn can move forward, false otherwise
 */
export function isValidPawnMove(move: Move, board: Board, isWhite: boolean, moveHistory: Move[]): boolean {
    const { from, to } = move;
    const piece = board.getPiece(from);

    if (!piece || piece.type !== "pawn") return false;

    const direction = isWhite ? -1 : 1;

    const startingRow = isWhite ? 6 : 1;

    // Check if the pawn can move forward
    if (to.col === from.col && to.row === from.row + direction && board.getPiece(to) === null) {
        return true;
    }

    // Check if the pawn is in starting position and can move two squares forward
    if (
        to.col === from.col &&
        from.row === startingRow &&
        to.row === from.row + 2 * direction &&
        board.getPiece(to) === null &&
        board.getPiece({ row: to.row + direction, col: to.col }) === null
    ) {
        return true;
    }

    // Check if the pawn can move diagonally forward
    if (
        Math.abs(to.col - from.col) === 1 &&
        to.row === from.row + direction &&
        board.getPiece(to) !== null &&
        board.getPiece(to)?.color !== piece.color
    ) {
        return true;
    }

    // Check for En Passant
    const lastMove = moveHistory[moveHistory.length - 1];
    if (
        Math.abs(to.col - from.col) === 1 &&
        to.row === from.row + direction &&
        board.getPiece(to) === null &&
        lastMove &&
        lastMove.from.col === to.col &&
        lastMove.from.row === lastMove.to.row + direction * 2 &&
        board.getPiece({ row: from.row, col: to.col })?.color !== piece.color &&
        board.getPiece({ row: from.row, col: to.col })?.type === "pawn"
    ) {
        return true;
    }

    return false;
}

export function isValidSlidingMove(move: Move, board: Board, direction: { row: number, col: number }[]): boolean {
    const { from, to } = move;

    for (const { row: dr, col: dc } of direction) {
        let rowIndex = from.row + dr;
        let colIndex = from.col + dc;

        while (isWithinBounds(rowIndex, colIndex)) {
            const targetPiece = board.getPiece({ row: rowIndex, col: colIndex })
            if (rowIndex === to.row && colIndex === to.col) {
                return targetPiece === null || targetPiece.color !== board.getPiece(from)?.color;
            } else if (targetPiece !== null) {
                break;
            }

            rowIndex += dr;
            colIndex += dc;
        }
    }

    return false;
}

export function isValidRookMove(move: Move, board: Board): boolean {
    const direction = [
        { row: 1, col: 0 }, { row: -1, col: 0 }, { row: 0, col: 1 }, { row: 0, col: -1 }
    ];

    return isValidSlidingMove(move, board, direction);
}

export function isValidBishopMove(move: Move, board: Board): boolean {
    const direction = [
        { row: 1, col: 1 }, { row: 1, col: -1 },
        { row: -1, col: 1 }, { row: -1, col: -1 }
    ];

    return isValidSlidingMove(move, board, direction);
}

export function isValidKnightMove(move: Move, board: Board): boolean {
    const { from, to } = move;
    const piece = board.getPiece(from);

    if (!piece || piece.type !== "knight") return false;

    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);

    if (rowDiff === 2 && colDiff === 1 || rowDiff === 1 && colDiff === 2) {
        const targetPiece = board.getPiece(to);
        return targetPiece === null || targetPiece.color !== board.getPiece(from)?.color;
    }

    return false;
}

export function isValidQueenMove(move: Move, board: Board): boolean {
    const { from, to } = move;
    const piece = board.getPiece(from);

    if (!piece || piece.type !== "queen") return false;

    if (isValidRookMove(move, board) || isValidBishopMove(move, board)) {
        return true;
    }

    return false;
}

export function isValidKingMove(move: Move, board: Board): boolean {
    const { from, to } = move;
    const piece = board.getPiece(from);

    if (!piece || piece.type !== "king") return false;

    const directions = [
        { row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 },
        { row: -1, col: -1 }, { row: -1, col: 1 }, { row: 1, col: -1 }, { row: 1, col: 1 }
    ];

    for (const { row: dr, col: dc } of directions) {
        let rowIndex = from.row + dr;
        let colIndex = from.col + dc;

        while (isWithinBounds(rowIndex, colIndex)) {
            const piece = board.getPiece({ row: rowIndex, col: colIndex })
            if (rowIndex === to.row && colIndex === to.col && (piece === null || piece.color !== board.getPiece(from)?.color)) {
                return true;
            }
        }
    }
    return false;
}

export function intializeBoard(game: Game) {
    const whitePawn = new Piece("white", 'pawn', { row: 6, col: 0 }, { row: 6, col: 0 }, false);
    game.gameState.board.setPiece({ row: 6, col: 0 }, whitePawn);
    const whitePawn1 = new Piece("white", 'pawn', { row: 6, col: 1 }, { row: 6, col: 1 }, false);
    game.gameState.board.setPiece({ row: 6, col: 1 }, whitePawn1);
    const whitePawn2 = new Piece("white", 'pawn', { row: 6, col: 2 }, { row: 6, col: 2 }, false);
    game.gameState.board.setPiece({ row: 6, col: 2 }, whitePawn2);
    const whitePawn3 = new Piece("white", 'pawn', { row: 6, col: 3 }, { row: 6, col: 3 }, false);
    game.gameState.board.setPiece({ row: 6, col: 3 }, whitePawn3);
    const whitePawn4 = new Piece("white", 'pawn', { row: 6, col: 4 }, { row: 6, col: 4 }, false);
    game.gameState.board.setPiece({ row: 6, col: 4 }, whitePawn4);
    const whitePawn5 = new Piece("white", 'pawn', { row: 6, col: 5 }, { row: 6, col: 5 }, false);
    game.gameState.board.setPiece({ row: 6, col: 5 }, whitePawn5);
    const whitePawn6 = new Piece("white", 'pawn', { row: 6, col: 6 }, { row: 6, col: 6 }, false);
    game.gameState.board.setPiece({ row: 6, col: 6 }, whitePawn6);
    const whitePawn7 = new Piece("white", 'pawn', { row: 6, col: 7 }, { row: 6, col: 7 }, false);
    game.gameState.board.setPiece({ row: 6, col: 7 }, whitePawn7);
    const blackPawn = new Piece("black", 'pawn', { row: 1, col: 0 }, { row: 1, col: 0 }, false);
    game.gameState.board.setPiece({ row: 1, col: 0 }, blackPawn);
    const blackPawn1 = new Piece("black", 'pawn', { row: 1, col: 1 }, { row: 1, col: 1 }, false);
    game.gameState.board.setPiece({ row: 1, col: 1 }, blackPawn1);
    const blackPawn2 = new Piece("black", 'pawn', { row: 1, col: 2 }, { row: 1, col: 2 }, false);
    game.gameState.board.setPiece({ row: 1, col: 2 }, blackPawn2);
    const blackPawn3 = new Piece("black", 'pawn', { row: 1, col: 3 }, { row: 1, col: 3 }, false);
    game.gameState.board.setPiece({ row: 1, col: 3 }, blackPawn3);
    const blackPawn4 = new Piece("black", 'pawn', { row: 1, col: 4 }, { row: 1, col: 4 }, false);
    game.gameState.board.setPiece({ row: 1, col: 4 }, blackPawn4);
    const blackPawn5 = new Piece("black", 'pawn', { row: 1, col: 5 }, { row: 1, col: 5 }, false);
    game.gameState.board.setPiece({ row: 1, col: 5 }, blackPawn5);
    const blackPawn6 = new Piece("black", 'pawn', { row: 1, col: 6 }, { row: 1, col: 6 }, false);
    game.gameState.board.setPiece({ row: 1, col: 6 }, blackPawn6);
    const blackPawn7 = new Piece("black", 'pawn', { row: 1, col: 7 }, { row: 1, col: 7 }, false);
    game.gameState.board.setPiece({ row: 1, col: 7 }, blackPawn7);
    const whiteRook = new Piece("white", 'rook', { row: 7, col: 0 }, { row: 7, col: 0 }, false);
    game.gameState.board.setPiece({ row: 7, col: 0 }, whiteRook);
    const whiteRook1 = new Piece("white", 'rook', { row: 7, col: 7 }, { row: 7, col: 7 }, false);
    game.gameState.board.setPiece({ row: 7, col: 7 }, whiteRook1);
    const whiteKnight = new Piece("white", 'knight', { row: 7, col: 1 }, { row: 7, col: 1 }, false);
    game.gameState.board.setPiece({ row: 7, col: 1 }, whiteKnight);
    const whiteKnight1 = new Piece("white", 'knight', { row: 7, col: 6 }, { row: 7, col: 6 }, false);
    game.gameState.board.setPiece({ row: 7, col: 6 }, whiteKnight1);
    const whiteBishop = new Piece("white", 'bishop', { row: 7, col: 2 }, { row: 7, col: 2 }, false);
    game.gameState.board.setPiece({ row: 7, col: 2 }, whiteBishop);
    const whiteBishop1 = new Piece("white", 'bishop', { row: 7, col: 5 }, { row: 7, col: 5 }, false);
    game.gameState.board.setPiece({ row: 7, col: 5 }, whiteBishop1);
    const whiteQueen = new Piece("white", 'queen', { row: 7, col: 3 }, { row: 7, col: 3 }, false);
    game.gameState.board.setPiece({ row: 7, col: 3 }, whiteQueen);
    const whiteKing = new Piece("white", 'king', { row: 7, col: 4 }, { row: 7, col: 4 }, false);
    game.gameState.board.setPiece({ row: 7, col: 4 }, whiteKing);
    const blackKing = new Piece("black", 'king', { row: 0, col: 4 }, { row: 0, col: 4 }, false);
    game.gameState.board.setPiece({ row: 0, col: 4 }, blackKing);
    const blackQueen = new Piece("black", 'queen', { row: 0, col: 3 }, { row: 0, col: 3 }, false);
    game.gameState.board.setPiece({ row: 0, col: 3 }, blackQueen);
    const blackBishop = new Piece("black", 'bishop', { row: 0, col: 2 }, { row: 0, col: 2 }, false);
    game.gameState.board.setPiece({ row: 0, col: 2 }, blackBishop);
    const blackBishop1 = new Piece("black", 'bishop', { row: 0, col: 5 }, { row: 0, col: 5 }, false);
    game.gameState.board.setPiece({ row: 0, col: 5 }, blackBishop1);
    const blackRook = new Piece("black", 'rook', { row: 0, col: 0 }, { row: 0, col: 0 }, false);
    game.gameState.board.setPiece({ row: 0, col: 0 }, blackRook);
    const blackRook1 = new Piece("black", 'rook', { row: 0, col: 7 }, { row: 0, col: 7 }, false);
    game.gameState.board.setPiece({ row: 0, col: 7 }, blackRook1);
    const blackKnight = new Piece("black", 'knight', { row: 0, col: 1 }, { row: 0, col: 1 }, false);
    game.gameState.board.setPiece({ row: 0, col: 1 }, blackKnight);
    const blackKnight1 = new Piece("black", 'knight', { row: 0, col: 6 }, { row: 0, col: 6 }, false);
    game.gameState.board.setPiece({ row: 0, col: 6 }, blackKnight1);

    for (let i = 2; i < 6; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            game.gameState.board.setPiece({ row: i, col: j }, null);
        }
    }

    game.gameState.currentPlayer = "white";
}

export function enPassantTest(game: Game) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            game.gameState.board.setPiece({ row: i, col: j }, null);
        }
    }

    const whitePawn = new Piece("white", 'pawn', { row: 6, col: 0 }, { row: 6, col: 0 }, false);
    game.gameState.board.setPiece({ row: 6, col: 0 }, whitePawn);
    const blackPawn = new Piece("black", 'pawn', { row: 4, col: 1 }, { row: 4, col: 1 }, false);
    game.gameState.board.setPiece({ row: 4, col: 1 }, blackPawn);
    const whiteKing = new Piece("white", 'king', { row: 7, col: 4 }, { row: 7, col: 4 }, false);
    game.gameState.board.setPiece({ row: 7, col: 4 }, whiteKing);
    const blackKing = new Piece("black", 'king', { row: 0, col: 4 }, { row: 0, col: 4 }, false);
    game.gameState.board.setPiece({ row: 0, col: 4 }, blackKing);

    game.gameState.currentPlayer = "white";
}

export function checkingIsSquareBeingAttacked(game: Game) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            game.gameState.board.setPiece({ row: i, col: j }, null);
        }
    }

    const whiteKing = new Piece("white", 'king', { row: 7, col: 0 }, { row: 7, col: 0 }, false);
    game.gameState.board.setPiece({ row: 7, col: 0 }, whiteKing);
    const blackKing = new Piece("black", 'king', { row: 7, col: 6 }, { row: 7, col: 6 }, false);
    game.gameState.board.setPiece({ row: 7, col: 6 }, blackKing);
}
