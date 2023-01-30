import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

const missingBits = (val: number[]): string => {
  const result: (string | number)[] = [val[0]];

  for (let i = 1, l = val.length; i < l; i++) {
    const diff = val[i] - val[i - 1];

    if (diff > 2) {
      result.push("...");
    } else if (diff == 2) {
      result.push(val[i] - 1);
    }

    result.push(val[i]);
  }

  return `[${result.join(",")}]`;
};

Deno.test("test", () => {
  assertEquals(
    missingBits([1, 2, 3, 4, 20, 21, 22, 23]),
    "[1,2,3,4,...,20,21,22,23]"
  );
  assertEquals(missingBits([1, 2, 3, 5, 6]), "[1,2,3,4,5,6]");
  assertEquals(missingBits([1, 3, 20, 27]), "[1,2,3,...,20,...,27]");
});
