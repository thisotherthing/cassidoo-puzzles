import { assertEquals } from "./utils.ts";

const minSubs = (val: number[], len: number): number[] => {
  let minSum = Number.POSITIVE_INFINITY;
  let minSumIndex = 0;

  for (let i = 0, l = val.length - len; i < l; i++) {
    const sum = val.slice(i, i + len).reduce((prev, cur) => prev + cur, 0);
    if (sum < minSum) {
      minSum = sum;
      minSumIndex = i;
    }
  }

  return val.slice(minSumIndex, minSumIndex + len);
};

Deno.test("test", () => {
  assertEquals(minSubs([1, 3, 20, 4, 8, 9, 11], 3), [4, 8, 9]);
  assertEquals(minSubs([4, 4, 4, 4, 8], 2), [4, 4]);
});
