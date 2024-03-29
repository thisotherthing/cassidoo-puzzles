import { assertEquals } from "./utils.ts";

const fibLike = (a: number, b: number, count: number): number[] => {
  const result: number[] = [a, b];

  while (result.length < count) {
    result.push(result[result.length - 1] + result[result.length - 2]);
  }

  return result;
};

Deno.test("test", () => {
  const n = 5;

  assertEquals(fibLike(10, 20, n), [10, 20, 30, 50, 80]);
  assertEquals(fibLike(3, 7, n), [3, 7, 10, 17, 27]);
});
