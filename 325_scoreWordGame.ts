import { assertEquals } from "./utils.ts";

const wordList = ["apple", "banana", "cherry", "date", "fig"];
// This produces { 'a': 1, 'b': 2, 'c': 3, 'd': 4, ... }
const letterScores: Record<string, number> = Object.fromEntries(
  new Array(26).fill(null).map((_, i) => [String.fromCharCode(97 + i), i + 1])
);

const getWordScore = (word: string, scores: typeof letterScores) =>
  word.length * word.split("").reduce((prev, curr) => prev + scores[curr], 0);

const scoreWordGame = (
  words: string[],
  scores: typeof letterScores
): string => {
  let highestScore = Number.NEGATIVE_INFINITY;
  let bestWord = "";

  for (const word of words) {
    const wordScore = getWordScore(word, scores);
    if (wordScore > highestScore) {
      bestWord = word;
      highestScore = wordScore;
      continue;
    }

    if (wordScore === highestScore) {
      // if there are multiple words with the same highest score, return the lexicographically smallest one
      bestWord = [word, bestWord].sort()[0];
    }
  }

  return bestWord;
};

Deno.test("test", () => {
  assertEquals(scoreWordGame(wordList, letterScores), "cherry");
});
