import { assertEquals } from "./utils.ts";

const trimArray = (array: number[], start = 0, end = 0): number[] =>
  array.slice(start, array.length - end);

Deno.test("test", () => {
  assertEquals(trimArray([1, 2, 3, 4, 5, 6], 2, 1), [3, 4, 5]);
  assertEquals(trimArray([6, 2, 4, 3, 7, 1, 3], 5, 0), [1, 3]);
  assertEquals(trimArray([1, 7], 0, 0), [1, 7]);
});
