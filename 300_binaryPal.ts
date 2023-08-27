import { assertEquals } from "./utils.ts";

const binaryPal = (val: number): boolean => {
  const binary: string[] = val.toString(2).split("");

  const length = binary.length;

  // check if palindrome
  for (let i = 0, l = Math.floor(length / 2); i < l; i++) {
    if (binary[i] !== binary[length - i - 1]) {
      return false;
    }
  }

  return true;
};

Deno.test("test", () => {
  assertEquals(binaryPal(5), true);
  assertEquals(binaryPal(10), false);
});
