import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

const arraySum = (arr: number[]) => {
  let val = 0;

  for (let i = 0, l = arr.length; i < l; i++) {
    val += arr[i];
  }

  return val;
};

const maxSubarray = (arr: number[], val: number): number[] => {
  if (arr.length < val) return arr;

  let maxVal = Number.MIN_VALUE;
  let maxIdx = -1;

  for (let i = 0, l = arr.length - val + 1; i < l; i++) {
    const sliceSum = arraySum([...arr].splice(i, val));

    if (sliceSum > maxVal) {
      maxVal = sliceSum;
      maxIdx = i;
    }
  }

  return arr.splice(maxIdx, val);
};

Deno.test("test", () => {
  assertEquals(maxSubarray([-4, 2, -5, 1, 2, 3, 6, -5, 1], 4), [1, 2, 3, 6]);
  assertEquals(maxSubarray([1, 2, 0, 5], 2), [0, 5]);
});
