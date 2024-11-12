export function parseMove(move: string): [number, number] {
    const normalMove: [number, number] = [0, 0];

    if (move.length === 3) {
        normalMove[1] = parseInt(move[2]) - 1;
        if (move[1] === "a") {
            normalMove[0] = 0;
        } else if (move[1] === "b") {
            normalMove[0] = 1;
        } else if (move[1] === "c") {
            normalMove[0] = 2;
        } else if (move[1] === "d") {
            normalMove[0] = 3;
        } else if (move[1] === "e") {
            normalMove[0] = 4;
        } else if (move[1] === "f") {
            normalMove[0] = 5;
        } else if (move[1] === "g") {
            normalMove[0] = 6;
        } else if (move[1] === "h") {
            normalMove[0] = 7;
        }
    } else if (move.length === 4) {
        normalMove[1] = parseInt(move[3]) - 1;
        if (move[2] === "a") {
            normalMove[0] = 0;
        } else if (move[2] === "b") {
            normalMove[0] = 1;
        } else if (move[2] === "c") {
            normalMove[0] = 2;
        } else if (move[2] === "d") {
            normalMove[0] = 3;
        } else if (move[2] === "e") {
            normalMove[0] = 4;
        } else if (move[2] === "f") {
            normalMove[0] = 5;
        } else if (move[2] === "g") {
            normalMove[0] = 6;
        } else if (move[2] === "h") {
            normalMove[0] = 7;
        }
    } else if (move.length === 5) {
        normalMove[1] = parseInt(move[3]) - 1;
        if (move[2] === "a") {
            normalMove[0] = 0;
        } else if (move[2] === "b") {
            normalMove[0] = 1;
        } else if (move[2] === "c") {
            normalMove[0] = 2;
        } else if (move[2] === "d") {
            normalMove[0] = 3;
        } else if (move[2] === "e") {
            normalMove[0] = 4;
        } else if (move[2] === "f") {
            normalMove[0] = 5;
        } else if (move[2] === "g") {
            normalMove[0] = 6;
        } else if (move[2] === "h") {
            normalMove[0] = 7;
        }
    } else {
        throw new Error("Invalid move");
    }

    return normalMove;
}

export function getPiece(move: string): string {
    let piece: string = "";

    if (move[0] === "p") {
        piece = "pawn";
    } else if (move[0] === "r") {
        piece = "rook";
    } else if (move[0] === "n") {
        piece = "knight";
    } else if (move[0] === "b") {
        piece = "bishop";
    } else if (move[0] === "q") {
        piece = "queen";
    } else if (move[0] === "k") {
        piece = "king";
    }

    return piece;
}
console.log(parseMove("pxe4"));
console.log(getPiece("pxe4"));
