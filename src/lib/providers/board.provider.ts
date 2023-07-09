import type { Board } from "../../model/board";

export const createBoardFunction = (): Board => {
  const initialState: Board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  return initialState;
};

type PickCellParams = {
  player: 1 | 2;
  line: 0 | 1 | 2;
  column: 0 | 1 | 2;
  board: Board;
};

export const pickCell = ({
  player,
  line,
  column,
  board,
}: PickCellParams): Board => {
  const cell = board[line][column];

  if (cell !== 0) {
    throw new Error("Cell is already taken");
  }

  board[line][column] = player;
  return board;
};

