import { Board } from "./types/types";

export function deepCopyBoard(board: Board): Board {
    return board.map(row => [...row]);
}
