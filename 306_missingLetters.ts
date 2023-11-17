import { assertEquals } from "./utils.ts";

const missingLetters = (letters: string[]): string[] => {
  const start = letters[0].charCodeAt(0);
  const end = letters.at(-1)!.charCodeAt(0);

  const idealArray: string[] = new Array(end - start)
    .fill(null)
    .map((_, i) => String.fromCharCode(start + i));

  return idealArray.filter((c) => !letters.includes(c));
};

Deno.test("test", () => {
  assertEquals(missingLetters(["a", "b", "c", "d", "f"]), ["e"]);
  assertEquals(
    missingLetters([
      "a",
      "b",
      "c",
      "d",
      "e",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "w",
      "x",
      "y",
      "z",
    ]),
    ["f", "g", "v"]
  );
});
