import { assertEquals } from "./utils.ts";

// Given a 2D array of 0s and 1s, where 0 represents water and 1 represents land, return the size of the largest "island" in the water. Diagonal connections don't count!

type Map = number[][];

const getIslandSize = (
  map: Map,
  x: number,
  lx: number,
  y: number,
  ly: number,
  curentSize: number,
  visited: Set<number>,
): number => {
  // stop out of bounds checks
  if (x < 0 || y < 0 || y >= ly || x >= lx) {
    return curentSize;
  }

  const index = y * lx + x;

  // don't revisit nodes
  if (visited.has(index)) {
    return curentSize;
  }

  // check self
  visited.add(index);
  if (map[y][x] === 1) {
    curentSize++;
  } else {
    return curentSize;
  }

  // check neighbors
  curentSize = getIslandSize(map, x - 1, lx, y, ly, curentSize, visited);
  curentSize = getIslandSize(map, x + 1, lx, y, ly, curentSize, visited);
  curentSize = getIslandSize(map, x, lx, y - 1, ly, curentSize, visited);
  curentSize = getIslandSize(map, x, lx, y + 1, ly, curentSize, visited);

  return curentSize;
};

const largestIsland = (input: Map): number => {
  const visited: Set<number> = new Set();

  let largestIsland = 0;

  for (let y = 0, ly = input.length; y < ly; y++) {
    for (let x = 0, lx = input.length; x < lx; x++) {
      const index = y * lx + x;

      // skip already visited positions
      if (visited.has(index)) {
        continue;
      }

      // if we found land, get island size
      // and keep track if largest size
      if (input[y][x] === 1) {
        largestIsland = Math.max(
          largestIsland,
          getIslandSize(input, x, lx, y, ly, 0, visited),
        );
      }

      visited.add(index);
    }
  }

  return largestIsland;
};

Deno.test("test", () => {
  assertEquals(
    largestIsland(
      [
        [0, 1, 1, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 1, 1, 1, 0],
      ],
    ),
    7,
  );

  assertEquals(
    largestIsland(
      [
        [0, 1, 0, 0, 0, 0, 0, 1, 1],
        [0, 1, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0],
      ],
    ),
    6,
  );
});
