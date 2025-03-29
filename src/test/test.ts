import { Game } from "../index";
import { checkingIsSquareBeingAttacked, intializeBoard } from "../helper";
import { isTheSquareBeingAttacked } from "../utils";

const game = new Game();
checkingIsSquareBeingAttacked(game);
console.log(isTheSquareBeingAttacked(game, { row: 7, col: 7 }));
