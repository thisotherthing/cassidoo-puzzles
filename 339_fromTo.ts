import { assertEquals } from "./utils.ts";

// Write a function called daysBetween that takes in two dates, and returns the number of days between those dates. You can choose the date format you'd like to accept!

const fromTo = (start: number, end: number): () => number | null => {
  const dir = Math.sign(end - start);

  // offset start, to make following logic easier
  start -= dir;

  return () => {
    if (start + dir !== end) {
      start += dir;

      return start;
    }

    return null;
  };
};

Deno.test("test", () => {
  const range = fromTo(0, 3);

  assertEquals(range(), 0);
  assertEquals(range(), 1);
  assertEquals(range(), 2);
  assertEquals(range(), null);
});

Deno.test("test", () => {
  const range = fromTo(3, 0);

  assertEquals(range(), 3);
  assertEquals(range(), 2);
  assertEquals(range(), 1);
  assertEquals(range(), null);
});
