import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

type Board = {
  width: number;
  height: number;
  blackPieces: Record<string, [number, number]>;
  whitePieces: Record<string, [number, number]>;
};

const parseBoard = (boardString: string): Board => {
  const lines = boardString.trim().split("\n");

  const width = lines[0].trim().length;
  const height = lines.length;

  const board: Board = {
    width,
    height,
    blackPieces: {},
    whitePieces: {},
  };

  // parse pieces
  for (let y = 0; y < height; y++) {
    const line = lines[y].trim();
    for (let x = 0; x < width; x++) {
      const char = line[x];
      if (char !== "~") {
        // lowercase is black
        if (char === char.toLowerCase()) {
          board.blackPieces[char] = [x, y];
        } else {
          // white
          board.whitePieces[char] = [x, y];
        }
      }
    }
  }

  return board;
};

const isValidMove = (
  boardString: string,
  piece: string,
  moveTo: [number, number]
): boolean => {
  const board = parseBoard(boardString);

  // check if piece is on board
  if (!board.blackPieces[piece] && !board.whitePieces[piece]) {
    return false;
  }

  const piecePosition: [number, number] =
    board.blackPieces[piece] || board.whitePieces[piece];

  const moveDelta: [number, number] = [
    moveTo[0] - piecePosition[0],
    moveTo[1] - piecePosition[1],
  ];

  switch (piece.toLowerCase()) {
    case "k":
      // king can move one step
      if (Math.abs(moveDelta[0]) > 1 || Math.abs(moveDelta[1]) > 1) {
        return false;
      }
      break;
    case "r":
      // rook can't move diagonally
      if (moveDelta[0] !== 0 && moveDelta[1] !== 0) {
        return false;
      }
      break;
  }

  return true;
};

Deno.test("test", () => {
  const board = `
~~~~~~~~
~~kb~~~~
~~K~~~~~
~~~~~~~~
~~~~~~~~
~~~~~~~~
~~~~~~~~
~~~R~~~~
`.trim();

  assertEquals(isValidMove(board, "R", [0, 0]), false); // A rook can only move horizontally and vertically
  assertEquals(isValidMove(board, "k", [1, 1]), true); // A king can move one square at a time in any direction
  assertEquals(isValidMove(board, "Q", [5, 7]), false); // The queen is not on the board
});
