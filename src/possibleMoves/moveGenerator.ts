import { Board, Position } from "../types/types";

export function getRookMoves(board: Board, row: number, col: number, isWhite: boolean): [number, number][] {
    const opponent = isWhite ? "black" : "white";
    const your_color = isWhite ? "white" : "black";
    const moves: [number, number][] = [];

    for (let i = row + 1; i < 8; i++) {
        const piece = board[i][col]
        if (piece && piece.startsWith(your_color)) {
            break
        } else if (piece && piece.startsWith(opponent)) {
            moves.push([i, col])
            break
        }

        moves.push([i, col])
    }

    for (let i = row - 1; i >= 0; i--) {
        const piece = board[i][col]
        if (piece && piece.startsWith(your_color)) {
            break
        } else if (piece && piece.startsWith(opponent)) {
            moves.push([i, col])
            break
        }

        moves.push([i, col])
    }

    for (let i = col + 1; i < 8; i++) {
        const piece = board[row][i]
        if (piece && piece.startsWith(your_color)) {
            break
        } else if (piece && piece.startsWith(opponent)) {
            moves.push([row, i]);
            break
        }

        moves.push([row, i])
    }

    for (let i = col - 1; i >= 0; i--) {
        const piece = board[row][i]
        if (piece && piece.startsWith(your_color)) {
            break
        } else if (piece && piece.startsWith(opponent)) {
            moves.push([row, i]);
            break
        }

        moves.push([row, i])
    }

    return moves;
}

export function getQueenMoves(board: Board, row: number, col: number, isWhite: boolean): [number, number][] {
    const rookMoves: [number, number][] = getRookMoves(board, row, col, isWhite);
    const bishopMoves: [number, number][] = getBishopMoves(board, row, col, isWhite);
    const queenMoves: [number, number][] = [];

    rookMoves.map((move) => queenMoves.push(move));
    bishopMoves.map((move) => queenMoves.push(move));
    return queenMoves;
}

export function getKingMoves(board: Board, row: number, col: number, isWhite: boolean): [number, number][] {
    const opponent: string = isWhite ? "black" : "white";
    const directions = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        { row: -1, col: -1 },
        { row: -1, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 1 }
    ];

    const kingMoves: [number, number][] = directions.map(dir => [row + dir.row, col + dir.col]);

    return kingMoves.filter(([r, c]) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const piece = board[r][c]
            if (piece && piece.startsWith(opponent)) {
                return true
            } else if (piece === null) {
                return true
            }
        }

        return false
    });
}

export function getPawnMoves(board: Board, row: number, col: number, isWhite: boolean): [number, number][] {
    const opponent = isWhite ? "black" : "white";
    const moves: [number, number][] = [];
    let whitePromotingAvailable: boolean = false;
    let blackPromotingAvailable: boolean = false;
    const pawnRowDirection = isWhite ? -1 : 1;
    const pawnStartColumn = isWhite ? 6 : 1;
    const pawnPromotionColumn = isWhite ? 1 : 6;

    if (row === pawnStartColumn) {
        moves.push([row + 2 * pawnRowDirection, col]);
    }

    if (row === pawnPromotionColumn) {
        if (isWhite) {
            whitePromotingAvailable = true;
        } else {
            blackPromotingAvailable = true;
        }
    }

    if (row + pawnRowDirection >= 0 && row + pawnRowDirection < 8) {
        const piece = board[row + pawnRowDirection][col]
        if (piece && piece === null) {
            moves.push([row + pawnRowDirection, col]);
        }
    }

    if (row + pawnRowDirection >= 0 && row + pawnRowDirection < 8 && col + 1 < 8) {
        const piece = board[row + pawnRowDirection][col + 1]
        if (piece && piece.startsWith(opponent)) {
            moves.push([row + pawnRowDirection, col + 1]);
        }
    }

    if (row + pawnRowDirection >= 0 && row + pawnRowDirection < 8 && col - 1 >= 0) {
        const piece = board[row + pawnRowDirection][col - 1]
        if (piece && piece.startsWith(opponent)) {
            moves.push([row + pawnRowDirection, col - 1]);
        }
    }

    return moves;
}

export function getKnightMoves(board: Board, row: number, col: number, isWhite: boolean): [number, number][] {
    const opponent = isWhite ? "black" : "white";
    const knightMoves: [number, number][] = [
        [row + 2, col + 1], [row + 2, col - 1],
        [row - 2, col + 1], [row - 2, col - 1],
        [row + 1, col + 2], [row + 1, col - 2],
        [row - 1, col + 2], [row - 1, col - 2]
    ];

    return knightMoves.filter(([r, c]) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const piece = board[r][c]
            if (piece && piece.startsWith(opponent) || piece === null) {
                return true
            }
        }
        return false
    });
}

export function getBishopMoves(board: Board, row: number, col: number, isWhite: boolean): Position[] {
    const opponent: string = isWhite ? "black" : "white";
    const your_color: string = isWhite ? "white" : "black";
    const moves: [number, number][] = [];

    for (let i = 1; i < 8; i++) {
        if (row + i < 8 && col + i < 8) {
            const piece = board[row + i][col + i]
            if (piece && piece.startsWith(opponent + "_")) {
                moves.push([row + i, col + i])
                break
            } else if (piece && piece.startsWith(your_color + "_")) {
                break
            }

            moves.push([row + i, col + i]);
        }
    }
    for (let i = 1; i < 8; i++) {
        if (row - i >= 0 && col + i < 8) {
            const piece = board[row - i][col + i]
            if (piece && piece.startsWith(opponent + "_")) {
                moves.push([row - i, col + i]);
                break
            } else if (piece && piece.startsWith(your_color + "_")) {
                break
            }

            moves.push([row - i, col + i]);
        }
    }
    for (let i = 1; i < 8; i++) {
        if (row + i < 8 && col - i >= 0) {
            const piece = board[row + i][col - i]
            if (piece && piece.startsWith(opponent + "_")) {
                moves.push([row + i, col - i]);
                break
            } else if (piece && piece.startsWith(your_color + "_")) {
                break
            }

            moves.push([row + i, col - i]);
        }
    }
    for (let i = 1; i < 8; i++) {
        if (row - i >= 0 && col - i >= 0) {
            const piece = board[row - i][col - i]
            if (piece && piece.startsWith(opponent + "_")) {
                moves.push([row - i, col - i]);
                break
            } else if (piece && piece.startsWith(your_color + "_")) {
                break
            }

            moves.push([row - i, col - i]);
        }
    }

    return moves;
}

export function getAllOpponentMoves(board: Board, isWhite: boolean): Position[] {
    const opponentColor = isWhite ? "black" : "white";
    let moves: Position[] = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j]
            if (piece && piece.startsWith(opponentColor)) {
                const pieceType = piece.split("_")[1];
                switch (pieceType) {
                    case 'pawn':
                        moves.push(...getPawnMoves(board, i, j, !isWhite));
                        break;
                    case 'rook':
                        moves.push(...getRookMoves(board, i, j, !isWhite));
                        break;
                    case 'king':
                        moves.push(...getKingMoves(board, i, j, !isWhite));
                        break;
                    case 'queen':
                        moves.push(...getQueenMoves(board, i, j, !isWhite));
                        break;
                    case 'knight':
                        moves.push(...getKnightMoves(board, i, j, !isWhite));
                        break;
                    case 'bishop':
                        moves.push(...getBishopMoves(board, i, j, !isWhite));
                        break;
                    default:
                        console.log("error");
                }
            }
        }
    }

    return moves;
}

const newBoard: Board = [
    [null, null, null, 'black_king', null, null, null, null, null],
    [null, null, null, 'black_rook', null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, 'black_bishop', null, null, null, null, null, null],
    [null, null, 'white_bishop', 'white_bishop', null, null, null, null],
    [null, null, null, 'white_king', null, null, null, null],
]

console.log(getAllOpponentMoves(newBoard, false))
