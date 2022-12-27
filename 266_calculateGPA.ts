import { assertEquals } from "./utils.ts";

const mapping = Object.fromEntries(
  `
    A = 4 grade points
    A- = 3.7 grade points
    B+ = 3.3 grade points
    B = 3 grade points
    B- = 2.7 grade points
    C+ = 2.3 grade points
    C = 2 grade points
    C- = 1.7 grade points
    D+ = 1.3 grade points
    D = 1 grade points
    D- = 0.7 grade points
    F = 0 grade points
    `
    .trim()
    .split("\n")
    .map((line) => {
      const match = line.match(/(\w[+-]?) = (.*?) grade/)!;
      return [match[1], parseFloat(match[2])];
    })
);

const calculateGPA = (grades: string[]): number => {
  let average =
    grades.reduce((sum, grade) => sum + mapping[grade], 0) / grades.length;

  // round to one decimal precision
  average = Math.round(average * 10) / 10;

  return average;
};

Deno.test("test", () => {
  assertEquals(calculateGPA(["A"]), 4);
  assertEquals(calculateGPA(["F", "F", "F"]), 0);
  assertEquals(calculateGPA(["A", "A-", "B+", "B", "B-"]), 3.3);
  assertEquals(calculateGPA(["A", "B+", "C-", "A"]), 3.3);
});
