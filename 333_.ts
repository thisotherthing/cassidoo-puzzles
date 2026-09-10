import { assertEquals } from "./utils.ts";

// Write a program that prints Happy new year! without using the string/character literals for the characters in the string!

const expected = "Happy new year!";

const getHappyNewYearString = (): string => {
  const data: number[] = [
    72,
    97,
    112,
    112,
    121,
    32,
    110,
    101,
    119,
    32,
    121,
    101,
    97,
    114,
    33,
  ];
  return String.fromCharCode(...data);
};

Deno.test("test", () => {
  console.log(
    Array.from({ length: expected.length }).fill(0).map((_, i) =>
      expected.charCodeAt(i)
    ),
  );

  assertEquals(getHappyNewYearString(), expected);
});
