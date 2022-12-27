import { assertEquals } from "./utils.ts";

const isValid = (str: string, start?: number, end?: number): boolean => {
  let val = 0;

  start = start || 0;
  end = end || str.length;

  // valid must start with (
  if (str[start] !== "(") return false;

  for (let i = start; i <= end; i++) {
    if (str[i] === "(") val += 1;
    if (str[i] === ")") val -= 1;
  }

  const valid = val == 0;

  if (valid)
    console.log(
      str.substring(start, end + 1),
      str.substring(start, end + 1).length,
      val === 0
    );

  return valid;
};

const parensSubstring = (str: string): number => {
  let longestLength = 0;

  for (let i = 0, l = str.length; i < l; i++) {
    for (let j = str.length; j >= i; j--) {
      if (j - i < longestLength) continue;

      if (isValid(str, i, j))
        longestLength = Math.max(longestLength, j + 1 - i);
    }
  }

  return longestLength;
};

Deno.test("test", () => {
  assertEquals(parensSubstring("(()("), 2);
  assertEquals(parensSubstring(")()(()))"), 6);
});
