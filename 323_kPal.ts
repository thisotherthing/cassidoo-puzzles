import { assertEquals } from "./utils.ts";

const isPalindrome = (text: string): boolean => {
  const textLength = text.length;

  if (textLength <= 1) {
    return true;
  }

  const checkCount = Math.ceil(text.length * 0.5);

  for (let i = 0; i < checkCount; i++) {
    if (text.at(i) !== text.at(-i - 1)) {
      return false;
    }
  }

  return true;
};

const removeCharAndTest = (
  input: string,
  removed: number,
  target: number
): boolean => {
  if (removed === target) {
    return isPalindrome(input);
  }

  for (let i = 0, l = input.length; i < l; i++) {
    if (
      removeCharAndTest(
        input.slice(0, i) + input.slice(i + 1),
        removed + 1,
        target
      )
    ) {
      return true;
    }
  }

  return false;
};

const kPal = (input: string, numRemove: number): boolean => {
  return removeCharAndTest(input, 0, numRemove);
};

Deno.test("test", () => {
  assertEquals(isPalindrome("a"), true);
  assertEquals(isPalindrome("aa"), true);
  assertEquals(isPalindrome("abba"), true);
  assertEquals(isPalindrome("abcba"), true);

  assertEquals(isPalindrome("ab"), false);
  assertEquals(isPalindrome("abcbc"), false);

  assertEquals(kPal("abcweca", 2), true);
  assertEquals(kPal("acxcb", 1), false);

  assertEquals(kPal("abcXba", 1), true);
});
