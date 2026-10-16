import { assertEquals } from "./utils.ts";

// Given an integer array, write a function hills(arr) and a function valleys(arr) that return the number of hills and valleys, respectively, in the array.
// The integers represent heights!

const checkTerrain = (
  heights: number[],
): { hills: number; valleys: number } => {
  const result = {
    hills: 0,
    valleys: 0,
  };

  if (heights.length < 3) {
    return result;
  }

  let isGoingUp = heights[1] > heights[0];

  for (let i = 1, l = heights.length; i < l; i++) {
    // no change doesn't matter to us
    if (heights[i - 1] === heights[i]) {
      continue;
    }

    const isNowGoingUp = heights[i] > heights[i - 1];

    // we're going down again, so track hill
    if (isGoingUp && !isNowGoingUp) {
      result.hills++;
    }

    // we're going up again, so track valley
    if (!isGoingUp && isNowGoingUp) {
      result.valleys++;
    }

    isGoingUp = isNowGoingUp;
  }

  return result;
};

const hills = (heights: number[]): number => checkTerrain(heights).hills;
const valleys = (heights: number[]): number => checkTerrain(heights).valleys;

const data: {
  arr: number[];
  hills: number;
  valleys: number;
}[] = [
  { arr: [1, 2, 1], hills: 1, valleys: 0 },
  { arr: [1, 0, 1], hills: 0, valleys: 1 },
  { arr: [7, 6, 5, 5, 4, 1], hills: 0, valleys: 0 },
  { arr: [3, 4, 1, 1, 6, 5], hills: 2, valleys: 1 },
];

Deno.test.each(data)("%o", (testData) => {
  const result = checkTerrain(testData.arr);

  console.log({ testData }, { result }, { hills: hills(testData.arr) }, {
    valleys: valleys(testData.arr),
  });

  assertEquals(hills(testData.arr), testData.hills);
  assertEquals(valleys(testData.arr), testData.valleys);
});
