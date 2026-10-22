import { expect, test } from "vitest";

// Given an array of numbers, add all of the values together but only if the number doesn't repeat a digit.

const uniqueSum = (input: number[]): number => {
  return input
    .filter((v) => {
      const chars = v.toFixed().split("");
      const set = new Set<string>();

      for (const char of chars) {
        if (set.has(char)) {
          return false;
        }

        set.add(char);
      }

      return true;
    })
    .reduce((prev, curr) => prev + curr, 0);
};

test("test", () => {
  expect(uniqueSum([1, 2, 3])).toBe(6);
  expect(uniqueSum([11, 22, 33])).toBe(0);
  expect(uniqueSum([101, 2, 3])).toBe(5);
});
