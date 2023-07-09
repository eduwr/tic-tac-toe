import type { Board } from "../../model/board";
import { createBoardFunction, pickCell } from "./board.provider";

describe("Board provider", () => {
  test("It should pass", () => {
    expect(1).toEqual(1);
  });

  test("createBoardFunction() - should create a new Board with initial state set", () => {
    const board: Board = createBoardFunction();

    board.forEach((line) => {
      line.forEach((cell) => {
        expect(cell).toEqual(0);
      });
    });
  });

  test("pickCell() - should return a new board with the given cell marked by the player number", () => {
    let board = createBoardFunction();

    const player = 1 as const;
    const indexes = [0, 1, 2] as const;

    indexes.forEach((line) => {
      indexes.forEach((column) => {
        board = pickCell({
          player,
          line,
          column,
          board,
        });
        expect(board[line][column]).toEqual(player);
      });
    });
  });

  test("pickCell() - should throw if the cell is already taken", () => {
    let board = createBoardFunction();
    const player = 2 as const;
    const line = 2;
    const column = 1;

    const props = {
      player,
      line,
      column,
      board,
    } as const;

    // THIS SHOULD NOT THROW
    pickCell(props);

    expect(() => pickCell(props)).toThrowError("Cell is already taken");
  });
});
