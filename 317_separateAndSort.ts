import { assertEquals } from "./utils.ts";

const separateAndSort = (input: number[]): [number[], number[]] => {
  const even: number[] = [];
  const odd: number[] = [];

  for (const number of input) {
    // skip 0
    if (number === 0) continue;

    (number % 2 === 0 ? even : odd).push(number);
  }

  return [even.sort(), odd.sort()];
};

Deno.test("test", () => {
  assertEquals(separateAndSort([4, 3, 2, 1, 5, 7, 8, 9]), [
    [2, 4, 8],
    [1, 3, 5, 7, 9],
  ]);
  assertEquals(separateAndSort([1, 1, 1, 1]), [[], [1, 1, 1, 1]]);
});
