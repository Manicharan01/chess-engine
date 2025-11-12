/**
 * This file contains test code for the chess engine.
 * @hidden
 */

import { Game, isTheSquareBeingAttacked } from "../index";
import { checkingIsSquareBeingAttacked } from "../test-utils/board-setups";

const game = new Game();
checkingIsSquareBeingAttacked(game);
console.log(isTheSquareBeingAttacked(game, { row: 7, col: 7 }));
