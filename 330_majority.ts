import { assertEquals } from "./utils.ts";

// Given an array of integers, return the majority element. If there is no majority element, return if the array is majority even or odd numbers, and if there is none, say so.

const majority = (
  input: number[],
): `${number}` | `Majority ${"odds" | "evens"}` | "No majority" => {
  const counts: Record<number, number> = {};
  let evenCount = 0;

  for (const number of input) {
    if (number % 2 === 0) {
      evenCount++;
    }

    if (!counts[number]) {
      counts[number] = 1;
    } else {
      counts[number]++;
    }
  }

  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  // if there is a majority, return it
  if (sortedCounts[0][1] > sortedCounts[1][1]) {
    return sortedCounts[0][0] as `${number}`;
  }

  if (evenCount > input.length * 0.5) {
    return "Majority evens";
  }
  if (evenCount < input.length * 0.5) {
    return "Majority odds";
  }

  return "No majority";
};

Deno.test("test", () => {
  assertEquals(majority([3, 1, 4, 1]), "1");
  assertEquals(majority([33, 44, 55, 66, 77]), "Majority odds");
  assertEquals(majority([32, 44, 55, 66, 77]), "Majority evens");
  assertEquals(majority([1, 2, 3, 4]), "No majority");
});
