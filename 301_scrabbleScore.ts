import { assertEquals } from "./utils.ts";

const data = `
1 point: E, A, I, O, N, R, T, L, S, U
2 points: D, G
3 points: B, C, M, P
4 points: F, H, V, W, Y
5 points: K
8 points: J, X
10 points: Q, Z
`;
const parseScoreValues = (data: string) => {
  const parsed: Record<string, number> = {};

  data
    .trim()
    .split("\n")
    .map((line) => {
      const split = line.trim().split(":");
      const points = parseInt(split[0].split(" ")[0].trim(), 10);
      const chars = split[1]
        .trim()
        .split(",")
        .map((c) => c.trim().toLowerCase());

      chars.forEach((c) => {
        parsed[c] = points;
      });
    });

  return parsed;
};

const scoreValues = parseScoreValues(data);

const scrabbleScore = (val: string): number => {
  return val
    .trim()
    .toLowerCase()
    .split("")
    .reduce((prev, c) => prev + scoreValues[c], 0);
};

Deno.test("test", () => {
  assertEquals(scrabbleScore("FIZZBUZZ"), 49);
});
