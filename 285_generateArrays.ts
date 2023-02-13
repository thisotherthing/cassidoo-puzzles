import { assertEquals } from "./utils.ts";

const generateArrays = (val: number): number[][] => {
  return new Array(val)
    .fill(null)
    .map((_, i) => new Array(i + 1).fill(null).map((_, j) => j + 1));
};

Deno.test("test", () => {
  assertEquals(generateArrays(1), [[1]]);
  assertEquals(generateArrays(4), [[1], [1, 2], [1, 2, 3], [1, 2, 3, 4]]);
});
