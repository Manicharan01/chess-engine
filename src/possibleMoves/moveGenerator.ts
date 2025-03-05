import { Board, Game, Piece } from "../index"
import { isKingInCheck } from "../check/check";
import { BoardType, Direction, Move, Moves, Position } from "../types/types";
import { applyMove } from "../utils";
import { isWithinBounds } from "../utils";

/**
 * Calculates all the possible moves for a given position on the board
 * @param board The board to get the possible moves from
 * @param position The position to get the possible moves from
 * @param directions The directions to calculate the possible moves from
 * @param isWhite Whether the color is white or black
 * @returns An array of all the possible moves for the given position
 */
function moveCalculation(board: Board, position: Position, directions: Direction[], isWhite: boolean): Position[] {
    const opponent = isWhite ? "black" : "white";
    const yourColor = isWhite ? "white" : "black";
    const moves: Position[] = [];

    for (const { row: dr, col: dc } of directions) {
        let rowIndex = position.row + dr;
        let colIndex = position.col + dc;

        while (isWithinBounds(rowIndex, colIndex)) {
            const piece = board.getPiece({ row: rowIndex, col: colIndex })
            if (!piece) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: rowIndex, col: colIndex } });
                if (!isKingInCheck(newBoard, isWhite)) {
                    moves.push({ row: rowIndex, col: colIndex });
                }
            } else if (piece.color === opponent) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: rowIndex, col: colIndex } });
                if (!isKingInCheck(newBoard, isWhite)) {
                    moves.push({ row: rowIndex, col: colIndex });
                }
                break;
            } else if (piece.color === yourColor) {
                break;
            }

            rowIndex += dr;
            colIndex += dc;
        }

    }

    return moves;
}

/**
* Gets all the possible rook moves for a given position on the board
* @param board The board to get the possible rook moves from
* @param position The position to get the possible rook moves from
* @param isWhite Whether the rook is white or black
* @returns An array of all the possible rook moves for the given position
*/
export function getRookMoves(board: Board, position: Position, isWhite: boolean): Position[] {
    const directions: Direction[] = [{ row: 1, col: 0 }, { row: -1, col: 0 }, { row: 0, col: 1 }, { row: 0, col: -1 }];

    const piece = board.getPiece(position);
    if (piece) {
        return moveCalculation(board, position, directions, isWhite);
    } else {
        console.error("Invalid position");
        throw new Error("Invalid position");
        return [];
    }
}

/**
 * Gets all the possible queen moves for a given position on the board
 * @param board The board to get the possible queen moves from
 * @param position The position to get the possible queen moves from
 * @param isWhite Whether the queen is white or black
 * @returns An array of all the possible queen moves for the given position
 */
export function getQueenMoves(board: Board, postion: Position, isWhite: boolean): Position[] {
    const rookMoves: Position[] = getRookMoves(board, postion, isWhite);
    const bishopMoves: Position[] = getBishopMoves(board, postion, isWhite);
    const queenMoves: Position[] = [];

    const piece = board.getPiece(postion);
    if (piece) {
        rookMoves.map((move) => queenMoves.push(move));
        bishopMoves.map((move) => queenMoves.push(move));
        return queenMoves;
    } else {
        console.error("Invalid position");
        throw new Error("Invalid position");
        return [];
    }
}

/**
 * Gets all the possible king moves for a given position on the board
 * @param board The board to get the possible king moves from
 * @param position The position to get the possible king moves from
 * @param isWhite Whether the king is white or black
 * @returns An array of all the possible king moves for the given position
 */
export function getKingMoves(game: Game, position: Position, isWhite: boolean): Position[] {
    const board = game.gameState.board;
    const opponent: string = isWhite ? "black" : "white";
    const yourColor: string = isWhite ? "white" : "black";
    const moves: Position[] = [];
    const directions: Direction[] = [
        { row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 },
        { row: -1, col: -1 }, { row: -1, col: 1 }, { row: 1, col: -1 }, { row: 1, col: 1 }
    ];

    const castlingRights = game.gameState.castlingRights[yourColor];
    if (castlingRights.kingSide) {
        moves.push({ row: position.row, col: position.col + 2 });
    }
    if (castlingRights.queenSide) {
        moves.push({ row: position.row, col: position.col - 2 });
    }

    const currentPiece = board.getPiece(position);
    if (currentPiece) {
        for (const { row: row, col: col } of directions) {
            const r = position.row + row;
            const c = position.col + col;

            if (isWithinBounds(r, c)) {
                const piece = board.getPiece({ row: r, col: c });
                if (!piece) {
                    const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: r, col: c } });
                    if (!isKingInCheck(newBoard, isWhite)) {
                        moves.push({ row: r, col: c });
                    }
                } else if (piece && piece.color === opponent) {
                    const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: r, col: c } });
                    if (!isKingInCheck(newBoard, isWhite)) {
                        moves.push({ row: r, col: c });
                    }
                    break;
                } else if (piece && piece.color === yourColor) {
                    break;
                }
            }
        }
    } else {
        console.error("Invalid position");
        throw new Error("Invalid position");
    }

    return moves;
}

/**
 * Gets all the possible pawn moves for a given position on the board
 * @param board The board to get the possible pawn moves from
 * @param position The position to get the possible pawn moves from
 * @param isWhite Whether the pawn is white or black
 * @returns An array of all the possible pawn moves for the given position
 */
export function getPawnMoves(board: Board, position: Position, isWhite: boolean): Position[] {
    const opponent = isWhite ? "black" : "white";
    const yourColor = isWhite ? "white" : "black";
    const moves: Position[] = [];
    let whitePromotingAvailable: boolean = false;
    let blackPromotingAvailable: boolean = false;
    const pawnRowDirection = isWhite ? -1 : 1;
    const pawnStartColumn = isWhite ? 6 : 1;
    const pawnPromotionColumn = isWhite ? 1 : 6;

    if (position.row === pawnPromotionColumn) {
        if (isWhite) {
            whitePromotingAvailable = true;
        } else {
            blackPromotingAvailable = true;
        }
    }

    const currentPiece = board.getPiece(position);
    if (currentPiece) {
        const oneSquareForward = { row: position.row + pawnRowDirection, col: position.col };
        if (oneSquareForward.row >= 0 && oneSquareForward.row < 8 && !board.getPiece(oneSquareForward)) {
            const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: oneSquareForward });
            if (!isKingInCheck(newBoard, isWhite)) {
                moves.push(oneSquareForward);
            }

            const twoSquaresForward = { row: position.row + 2 * pawnRowDirection, col: position.col };
            if (position.row === pawnStartColumn && !board.getPiece(twoSquaresForward)) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: twoSquaresForward });
                if (!isKingInCheck(newBoard, isWhite)) {
                    moves.push(twoSquaresForward);
                }
            }
        }

        const captureDirections = [{ row: pawnRowDirection, col: 1 }, { row: pawnRowDirection, col: -1 }];
        for (const { row: dr, col: dc } of captureDirections) {
            const target = { row: position.row + dr, col: position.col + dc };

            if (isWithinBounds(target.row, target.col)) {
                const piece = board.getPiece(target);
                if (piece && piece.color === opponent) {
                    const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: target });
                    if (!isKingInCheck(newBoard, isWhite)) {
                        moves.push(target);
                    }
                    break;
                } else if (piece && piece.color === yourColor) {
                    break;
                }
            }
        }
    } else {
        console.error("Invalid position");
        throw new Error("Invalid position");
    }

    return moves;
}

/**
 * Gets all the possible knight moves for a given position on the board
 * @param board The board to get the possible knight moves from
 * @param position The position to get the possible knight moves from
 * @param isWhite Whether the knight is white or black
 * @returns An array of all the possible knight moves for the given position
 */
export function getKnightMoves(board: Board, position: Position, isWhite: boolean): Position[] {
    const opponent = isWhite ? "black" : "white";
    const knightMoves: Position[] = [
        { row: position.row + 2, col: position.col + 1 }, { row: position.row + 2, col: position.col - 1 },
        { row: position.row - 2, col: position.col + 1 }, { row: position.row - 2, col: position.col - 1 },
        { row: position.row + 1, col: position.col + 2 }, { row: position.row + 1, col: position.col - 2 },
        { row: position.row - 1, col: position.col + 2 }, { row: position.row - 1, col: position.col - 2 }
    ];

    const currentPiece = board.getPiece(position);
    if (currentPiece) {
        return knightMoves.filter(({ row: r, col: c }) => {
            if (isWithinBounds(r, c)) {
                const piece = board.getPiece({ row: r, col: c })
                if (!piece) {
                    const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: r, col: c } });
                    return !isKingInCheck(newBoard, isWhite);
                } else if (piece && piece.color === opponent) {
                    const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: r, col: c } });
                    return !isKingInCheck(newBoard, isWhite);
                }

                return false;
            }
        });
    } else {
        console.error("Invalid position");
        throw new Error("Invalid position");
    }
}

/**
* Gets all the possible bishop moves for a given position on the board
* @param board The board to get the possible bishop moves from
* @param position The position to get the possible bishop moves from
* @param isWhite Whether the bishop is white or black
* @returns An array of all the possible bishop moves for the given position
*/
export function getBishopMoves(board: Board, position: Position, isWhite: boolean): Position[] {
    const directions: Direction[] = [
        { row: 1, col: 1 }, { row: 1, col: -1 },
        { row: -1, col: 1 }, { row: -1, col: -1 }
    ];
    const currentPiece = board.getPiece(position);
    if (currentPiece) {
        return moveCalculation(board, position, directions, isWhite);
    } else {
        console.error("Invalid position");
        throw new Error("Invalid position");
    }
}


/**
 * Gets all the possible moves for a given color on the board
 * @param board The board to get the possible moves from
 * @param isWhite Whether the color is white or black
 * @returns An array of all the possible moves for the given color
 */
export function getAllMoves(game: Game, isWhite: boolean): Moves {
    const board = game.gameState.board;
    const opponentColor = isWhite ? "black" : "white";
    let moves: Moves = new Map<Position, Position[]>();

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board.getPiece({ row: i, col: j })
            if (piece && piece.color === opponentColor) {
                const pieceType = piece.type
                const position = { row: i, col: j };
                switch (pieceType) {
                    case 'pawn':
                        moves.set(position, getPawnMoves(board, position, isWhite));
                        break;
                    case 'rook':
                        moves.set(position, getRookMoves(board, position, isWhite));
                        break;
                    case 'king':
                        moves.set(position, getKingMoves(game, position, isWhite));
                        break;
                    case 'queen':
                        moves.set(position, getQueenMoves(board, position, isWhite));
                        break;
                    case 'knight':
                        moves.set(position, getKnightMoves(board, position, isWhite));
                        break;
                    case 'bishop':
                        moves.set(position, getBishopMoves(board, position, isWhite));
                        break;
                    default:
                        console.log("Invalid piece type: " + piece.type);
                }
            }
        }
    }

    return moves;
}
