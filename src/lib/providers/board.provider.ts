import type { Board } from "../../model/board";
import type { Player } from "../../model/player";

export const createBoard = (): Board => {
  const initialState: Board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  return initialState;
};

type PickCellParams = {
  player: Player;
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

const transposeBoard = (board: Board): Board => {
  const _board = createBoard();

  const indexes = [0, 1, 2] as const;

  indexes.forEach((line) => {
    indexes.forEach((column) => {
      _board[line][column] = board[column][line];
    });
  });

  return _board;
};

const checkWinnerInLine = (board: Board): false | Player => {
  const res = board.map((line): false | Player => {
    const lineStr = line.join("");
    if (lineStr === "111") return 1;
    if (lineStr === "222") return 2;

    return false;
  });

  const [winner] = res.filter(Boolean);

  if (winner) {
    return winner;
  }

  return false;
};

const checkWinnerInDiagonal = (board: Board): false | Player => {
  const indexes = [0, 1, 2] as const;
  const diagonal = indexes.map((index) => board[index][index]);

  let resultStr = diagonal.join("");

  if (resultStr === "111") return 1;
  if (resultStr === "222") return 2;

  const reversedIndexes = [2, 1, 0] as const;
  const reverseDiagonal = indexes.map(
    (index) => board[index][reversedIndexes[index]]
  );

  resultStr = reverseDiagonal.join("");
  if (resultStr === "111") return 1;
  if (resultStr === "222") return 2;

  return false;
};

export const hasWinner = (board: Board): false | Player => {
  const winnerInLines = checkWinnerInLine(board);
  if (winnerInLines) {
    return winnerInLines;
  }

  const transposedBoard = transposeBoard(board);
  const winnerInColumns = checkWinnerInLine(transposedBoard);
  if (winnerInColumns) {
    return winnerInColumns;
  }

  const winnerInDiagonal = checkWinnerInDiagonal(board);

  if (winnerInDiagonal) {
    return winnerInDiagonal;
  }

  return false;
};
