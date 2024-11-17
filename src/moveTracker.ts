import { board } from ".";
import { Position, PieceMove, PieceTracker } from "./types/moveTypes";
import { CastlingRights } from "./types/types";

export class MoveTracker {
    private pieces: Map<string, PieceTracker> = new Map();
    private moveCount: number = 0;
    private castlingRights: CastlingRights = {
        whiteKingSide: true,
        whiteQueenSide: true,
        blackKingSide: true,
        blackQueenSide: true
    };

    constructor() {
        this.intializePieces();
    }

    private intializePieces() {
        board.forEach((row, rowIndex) => {
            row.forEach((piece, colIndex) => {
                if (piece !== "0") {
                    const [color, type] = piece.split("_");
                    const pieceId = `${color}_${type}_${colIndex}`;

                    this.pieces.set(pieceId, {
                        id: pieceId,
                        type: type as PieceTracker["type"],
                        color: color as 'white' | 'black',
                        moves: [],
                        isCaptured: false,
                        originalPosition: { row: rowIndex, col: colIndex }
                    })
                }
            })
        })
    }

    private updateCastlingRights(pieceId: string) {
        let piece = this.pieces.get(pieceId);
        if (!piece) throw new Error("Invalid piece id");

        if (piece.type === "king") {
            if (piece.color === "white") {
                this.castlingRights.whiteKingSide = false;
                this.castlingRights.whiteQueenSide = false;
            } else {
                this.castlingRights.blackKingSide = false;
                this.castlingRights.blackQueenSide = false;
            }
        }

        if (piece.type === "rook") {
            if (piece.color === "white") {
                if (piece.originalPosition.col === 0) {
                    this.castlingRights.whiteQueenSide = false;
                }
                if (piece.originalPosition.col === 7) {
                    this.castlingRights.whiteKingSide = false;
                }
            } else {
                if (piece.originalPosition.col === 0) {
                    this.castlingRights.blackQueenSide = false;
                }
                if (piece.originalPosition.col === 7) {
                    this.castlingRights.blackKingSide = false;
                }
            }
        }
    }

    recordMove(pieceId: string, from: Position, to: Position, capturedPieceId?: string) {
        let piece = this.pieces.get(pieceId);
        if (!piece) throw new Error("Invalid piece id");

        const move: PieceMove = {
            from: from,
            to: to,
            moveNumber: this.moveCount,
            timestamp: new Date(),
            isCapture: !!capturedPieceId,
            capturedPiece: capturedPieceId
        }

        piece.moves.push(move);

        this.moveCount++;

        if (capturedPieceId) {
            const capturedPiece = this.pieces.get(capturedPieceId);
            if (!capturedPiece) throw new Error("Invalid captured piece id");
            capturedPiece.isCaptured = true;
            capturedPiece.capturedBy = pieceId;
        }

        if (piece.type === "king" || piece.type === "rook") {
            this.updateCastlingRights(pieceId);
        }
    }

    getPieceMoveHistory(pieceId: string): PieceMove[] {
        return this.pieces.get(pieceId)?.moves || [];
    }

    getPieceStats(pieceId: string) {
        const piece = this.pieces.get(pieceId);
        if (!piece) throw new Error("Invalid piece id");

        return {
            totalMoves: piece.moves.length,
            captures: piece.moves.filter(move => move.isCapture).length,
            isCaptured: piece.isCaptured,
            capturedBy: piece.capturedBy,
            originalPosition: piece.originalPosition,
            currentPosition: piece.moves.length > 0 ? piece.moves[piece.moves.length - 1].to : piece.originalPosition
        }
    }

    getColorMoves(color: "white" | "black"): PieceMove[] {
        const moves: PieceMove[] = [];
        this.pieces.forEach(piece => {
            if (piece.color === color) {
                moves.push(...piece.moves);
            }
        })
        return moves.sort((a, b) => a.moveNumber - b.moveNumber);
    }

    getCastlingRights(): CastlingRights {
        return { ...this.castlingRights };
    }
}
