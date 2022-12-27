import { assertEquals } from "./utils.ts";

const antidivisor = (input: number): number[] => {
  const result: number[] = [];
  for (let i = 2; i <= input; i++) {
    if (!Number.isInteger(input / i)) {
      const mod = input % i;
      const iHalf = i / 2;
      if (Math.abs(mod - iHalf) <= 0.5) {
        result.push(i);
      }
    }
  }

  return result;
};

Deno.test("test", () => {
  assertEquals(antidivisor(1), []);
  assertEquals(antidivisor(3), [2]);
  assertEquals(antidivisor(5), [2, 3]);
  assertEquals(antidivisor(10), [3, 4, 7]);
  assertEquals(antidivisor(234), [4, 7, 12, 36, 52, 67, 156]);
});
