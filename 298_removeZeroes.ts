import { assertEquals } from "./utils.ts";

const removeZeroes = (val: number[]): number[] => {
  return val.filter((v) => v > 0);
};

Deno.test("test", () => {
  assertEquals(
    removeZeroes([0, 0, 0, 3, 1, 4, 1, 5, 9, 0, 0, 0, 0]),
    [3, 1, 4, 1, 5, 9]
  );
  assertEquals(removeZeroes([0, 0, 0]), []);
  assertEquals(removeZeroes([8]), [8]);
});
