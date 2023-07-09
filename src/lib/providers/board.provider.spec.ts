import type { Board } from "../../model/board";
import type { Player } from "../../model/player";
import { createBoard, hasWinner, pickCell, draw } from "./board.provider";

describe("Board provider", () => {
  test("It should pass", () => {
    expect(1).toEqual(1);
  });

  test("createBoardFunction() - should create a new Board with initial state set", () => {
    const board: Board = createBoard();

    board.forEach((line) => {
      line.forEach((cell) => {
        expect(cell).toEqual(0);
      });
    });
  });

  test("pickCell() - should return a new board with the given cell marked by the player number", () => {
    let board = createBoard();

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
    let board = createBoard();
    const player = 2 as const;
    const line = 2;
    const column = 1;

    const props = {
      player,
      line,
      column,
      board,
    } as const;

    pickCell(props);

    expect(() => pickCell(props)).toThrowError("Cell is already taken");
  });

  test("hasWinner() - should return the player when all cells in a line are filled with the same player", () => {
    let board = createBoard();
    const player = 2 as const;
    const line = 1 as const;
    const columns = [0, 1, 2] as const;
    columns.forEach((column) => {
      board = pickCell({
        player,
        line,
        column,
        board,
      });
    });

    const winner = hasWinner(board);
    expect(winner).toEqual(player);
  });

  test("hasWinner() - should return the player when all items in the column are filled with the same player", () => {
    let board = createBoard();
    const player = 2 as const;
    const lines = [0, 1, 2] as const;
    const column = 1 as const;
    lines.forEach((line) => {
      board = pickCell({
        player,
        line,
        column,
        board,
      });
    });

    const winner = hasWinner(board);
    expect(winner).toEqual(player);
  });

  test("hasWinner() - should return the player when all cells in a diagonal are filled by the same player", () => {
    let board = createBoard();
    const player = 2 as const;

    const lines = [0, 1, 2] as const;

    lines.forEach((line) => {
      board = pickCell({
        player,
        line,
        column: line,
        board,
      });
    });

    let winner = hasWinner(board);
    expect(winner).toEqual(player);
  });

  test("hasWinner() - should return the player when all cells in a reversed diagonal are filled by the same player", () => {
    let board = createBoard();
    const player = 2 as const;

    const lines = [0, 1, 2] as const;
    const columns = [2, 1, 0] as const;

    lines.forEach((line) => {
      board = pickCell({
        player,
        line,
        column: columns[line],
        board,
      });
    });

    let winner = hasWinner(board);
    expect(winner).toEqual(player);
  });

  test("hasWinner() - should return false when it doesn't have a winner", () => {
    let board: Board = [
      [1, 2, 1],
      [2, 2, 1],
      [2, 1, 2],
    ];

    let winner = hasWinner(board);
    expect(winner).toEqual(false);
  });

  test("draw() - should return FALSE when board is not fullfilled", () => {
    let board: Board = [
      [1, 2, 1],
      [0, 1, 2],
      [2, 1, 2],
    ];

    let result = draw(board);
    expect(result).toEqual(false);
  });

  test("draw() - should return TRUE when board is fullfilled and has NOT a winner", () => {
    let board: Board = [
      [1, 2, 1],
      [2, 1, 2],
      [2, 1, 2],
    ];

    let result = draw(board);

    expect(result).toEqual(true);
  });

  test("draw() - should return FALSE when board is fullfilled and HAS a winner", () => {
    let board: Board = [
      [2, 2, 1],
      [2, 1, 2],
      [2, 1, 1],
    ];

    let result = draw(board);

    expect(result).toEqual(false);
  });
});
