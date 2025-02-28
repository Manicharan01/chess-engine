import { isKingInCheck } from "../check/check";
import { AllMoves, Board, Direction, Position } from "../types/types";
import { applyMove } from "../utils";

const BOARD_SIZE = 8;

/**
 * Checks if a position is within the bounds of the board
 * @param row The row of the position
 * @param col The column of the position
 * @returns Whether the position is within the bounds of the board
 */
function isWithinBounds(row: number, col: number): boolean {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

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
            const piece = board[rowIndex][colIndex]
            if (!piece) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: rowIndex, col: colIndex } });
                if (!isKingInCheck(newBoard, isWhite)) {
                    moves.push({ row: rowIndex, col: colIndex });
                }
            } else if (piece.startsWith(opponent)) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: rowIndex, col: colIndex } });
                if (!isKingInCheck(newBoard, isWhite)) {
                    moves.push({ row: rowIndex, col: colIndex });
                }
                break;
            } else if (piece.startsWith(yourColor)) {
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

    return moveCalculation(board, position, directions, isWhite);
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

    rookMoves.map((move) => queenMoves.push(move));
    bishopMoves.map((move) => queenMoves.push(move));
    return queenMoves;
}

/**
 * Gets all the possible king moves for a given position on the board
 * @param board The board to get the possible king moves from
 * @param position The position to get the possible king moves from
 * @param isWhite Whether the king is white or black
 * @returns An array of all the possible king moves for the given position
 */
export function getKingMoves(board: Board, position: Position, isWhite: boolean): Position[] {
    const opponent: string = isWhite ? "black" : "white";
    const yourColor: string = isWhite ? "white" : "black";
    const moves: Position[] = [];
    const directions: Direction[] = [
        { row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 },
        { row: -1, col: -1 }, { row: -1, col: 1 }, { row: 1, col: -1 }, { row: 1, col: 1 }
    ];

    for (const { row: row, col: col } of directions) {
        const r = position.row + row;
        const c = position.col + col;

        if (isWithinBounds(r, c)) {
            const piece = board[r][c];
            if (!piece) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: r, col: c } });
                if (!isKingInCheck(newBoard, isWhite)) {
                    moves.push({ row: r, col: c });
                }
            } else if (piece.startsWith(opponent)) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: r, col: c } });
                if (!isKingInCheck(newBoard, isWhite)) {
                    moves.push({ row: r, col: c });
                }
                break;
            } else if (piece.startsWith(yourColor)) {
                break;
            }
        }
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

    const oneSquareForward = { row: position.row + pawnRowDirection, col: position.col };
    if (oneSquareForward.row >= 0 && oneSquareForward.row < 8 && !board[oneSquareForward.row][oneSquareForward.col]) {
        const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: oneSquareForward });
        if (!isKingInCheck(newBoard, isWhite)) {
            moves.push(oneSquareForward);
        }

        const twoSquaresForward = { row: position.row + 2 * pawnRowDirection, col: position.col };
        if (position.row === pawnStartColumn && !board[twoSquaresForward.row][twoSquaresForward.col]) {
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
            const piece = board[target.row][target.col];
            if (piece && piece.startsWith(opponent)) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: target });
                if (!isKingInCheck(newBoard, isWhite)) {
                    moves.push(target);
                }
                break;
            } else if (piece && piece.startsWith(yourColor)) {
                break;
            }
        }
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

    return knightMoves.filter(({ row: r, col: c }) => {
        if (isWithinBounds(r, c)) {
            const piece = board[r][c]
            if (!piece) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: r, col: c } });
                return !isKingInCheck(newBoard, isWhite);
            } else if (piece.startsWith(opponent)) {
                const newBoard = applyMove(board, { from: { row: position.row, col: position.col }, to: { row: r, col: c } });
                return !isKingInCheck(newBoard, isWhite);
            }

            return false;
        }
    });
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
    return moveCalculation(board, position, directions, isWhite);
}


/**
 * Gets all the possible moves for a given color on the board
 * @param board The board to get the possible moves from
 * @param isWhite Whether the color is white or black
 * @returns An array of all the possible moves for the given color
 */
export function getAllOpponentMoves(board: Board, isWhite: boolean): AllMoves {
    const opponentColor = isWhite ? "black" : "white";
    let moves: AllMoves = {
        'white_pawn': [],
        'white_rook': [],
        'white_knight': [],
        'white_bishop': [],
        'white_queen': [],
        'white_king': [],
        'black_pawn': [],
        'black_rook': [],
        'black_knight': [],
        'black_bishop': [],
        'black_queen': [],
        'black_king': []
    };

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j]
            if (piece && piece.startsWith(opponentColor)) {
                const pieceType = piece.split("_")[1];
                const position = { row: i, col: j };
                switch (pieceType) {
                    case 'pawn':
                        moves[piece].push(...getPawnMoves(board, position, !isWhite));
                        break;
                    case 'rook':
                        moves[piece].push(...getRookMoves(board, position, !isWhite));
                        break;
                    case 'king':
                        moves[piece].push(...getKingMoves(board, position, !isWhite));
                        break;
                    case 'queen':
                        moves[piece].push(...getQueenMoves(board, position, !isWhite));
                        break;
                    case 'knight':
                        moves[piece].push(...getKnightMoves(board, position, !isWhite));
                        break;
                    case 'bishop':
                        moves[piece].push(...getBishopMoves(board, position, !isWhite));
                        break;
                    default:
                        console.log("error");
                }
            }
        }
    }

    return moves;
}
