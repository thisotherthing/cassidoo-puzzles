import { assertEquals } from "./utils.ts";

// Write a function that determines if an array of numbers is a bitonic sequence.
// A bitonic sequence is a sequence of numbers in which the numbers are in increasing order, and after a certain point, they start decreasing.
// Extra credit: print the peak number in the sequence!

const isBitonic = (input: number[]): false | [true, number] => {
  let peak: number | undefined;
  let isStillIncreasing = true;

  for (let i = 1, l = input.length; i < l; i++) {
    if (isStillIncreasing) {
      // switch isStillIncreasing, if numbers start decreasing
      if (input[i - 1] > input[i]) {
        isStillIncreasing = false;
        peak = input[i - 1];
        continue;
      }
    } else {
      // if numbers go back up, stop
      if (input[i - 1] < input[i]) {
        return false;
      }
    }
  }

  // if we never started counting down, return false
  if (isStillIncreasing || !peak) {
    return false;
  }

  return [true, peak];
};

Deno.test("test", () => {
  assertEquals(isBitonic([1, 2, 3, 2]), [true, 3]); // extra credit: 3
  assertEquals(isBitonic([1, 2, 3]), false);
  assertEquals(isBitonic([3, 4, 5, 5, 5, 2, 1]), [true, 5]); // extra credit: 5
});
