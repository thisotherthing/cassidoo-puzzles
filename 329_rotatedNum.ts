import { assertEquals } from "./utils.ts";

const isSorted = (input: number[], offset = 0): boolean => {
  for (let i = 1, l = input.length; i < l; i++) {
    if (input[(i - 1 + offset) % l] > input[(i + offset) % l]) return false;
  }

  return true;
};

const rotatedNum = (input: number[]): number => {
  for (let i = 0, l = input.length; i < l; i++) {
    if (isSorted(input, i)) {
      return i;
    }
  }

  return -1;
};

Deno.test("test", () => {
  assertEquals(isSorted([7, 9, 20]), true);
  assertEquals(isSorted([4, 0, 1, 2, 3]), false);
  assertEquals(isSorted([0, 1, 2, 3, 4]), true);
  assertEquals(isSorted([4, 0, 1, 2, 3], 1), true);
  assertEquals(isSorted([7, 7, 314, 1337, 7], 4), true);

  assertEquals(rotatedNum([4, 0, 1, 2, 3]), 1);
  assertEquals(rotatedNum([7, 9, 20]), 0);
  assertEquals(rotatedNum([7, 7, 314, 1337, 7]), 4);
});
