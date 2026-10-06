import { assertEquals } from "./utils.ts";

// Given an integer array arr, return the maximum difference between two successive elements in arr's sorted form.
// Return 0 if there's 0 or 1 elements.

const maxGap = (input: number[]): number => {
  if (input.length <= 1) {
    return 0;
  }

  let max = 0;

  input.sort();

  for (let i = 1, l = input.length; i < l; i++) {
    max = Math.max(max, Math.abs(input[i - 1] - input[i]));
  }

  return max;
};

Deno.test("test", () => {
  assertEquals(maxGap([3, 6, 9, 1, 2]), 3);
});
