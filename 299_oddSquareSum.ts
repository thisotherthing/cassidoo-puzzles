import { assertEquals } from "./utils.ts";

const oddSquares = (index: number) => Math.pow(2 * index + 1, 2);

const oddSquareSum = (ceil: number): number => {
  let sum = 0;

  let index = 0;
  let lastVal = oddSquares(index);

  while (lastVal < ceil) {
    sum += lastVal;
    lastVal = oddSquares(++index);
  }

  return sum;
};

Deno.test("test", () => {
  assertEquals(oddSquareSum(1), 0);
  assertEquals(oddSquareSum(2), 1);
  assertEquals(oddSquareSum(9), 1);
  assertEquals(oddSquareSum(10), 10);
  assertEquals(oddSquareSum(44), 35);
});
