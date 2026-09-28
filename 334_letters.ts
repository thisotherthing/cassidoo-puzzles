import { assertEquals } from "./utils.ts";

// You have an array of letters. Return the number of possible sequences of letters you can make using the letters in the array. Extra credit: print the sequences!

const buildLetterPairs = (
  current: string[],
  letters: string[],
  pairs: Set<string>,
) => {
  if (current.length > 0) {
    pairs.add(current.join(""));
  }

  for (let i = 0, l = letters.length; i < l; i++) {
    const letter = letters.splice(i, 1)[0];

    if (letter) {
      current.push(letter);
      buildLetterPairs(current, letters, pairs);
      current.pop();

      letters.splice(i, 0, letter);
    }
  }
};

const letters = (input: string[]): number => {
  const set = new Set<string>();

  buildLetterPairs([], input, set);

  const pairs = [...set];

  console.log({ pairs });

  return pairs.length;
};

Deno.test("test", () => {
  assertEquals(letters(["X"]), 1);
  assertEquals(letters(["A", "A", "B"]), 8); // "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"
});
