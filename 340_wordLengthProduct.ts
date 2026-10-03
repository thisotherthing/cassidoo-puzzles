import { assertEquals } from "./utils.ts";

// Given a string array, find the maximum product of word lengths where the words don't share any letters.

const wordLengthProduct = (input: string[]): number => {
  let longestWordProduct = 0;

  for (let i = 0, l = input.length; i < l; i++) {
    const word = input.splice(i, 1)[0];

    const wordSet = new Set(word.split(""));

    for (const compare of input) {
      const compareSet = new Set(compare.split(""));

      if (wordSet.intersection(compareSet).size === 0) {
        longestWordProduct = Math.max(
          longestWordProduct,
          word.length * compare.length,
        );
      }
    }

    input.splice(i, 0, word);
  }

  return longestWordProduct;
};

Deno.test("test", () => {
  assertEquals(
    wordLengthProduct(["fish", "fear", "boo", "egg", "cake", "abcdef"]),
    16,
  ); // "fish" and "cake"
  assertEquals(wordLengthProduct(["a", "aa", "aaa", "aaaa"]), 0); // all of them share "a"
});
