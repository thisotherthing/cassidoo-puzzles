import { assertEquals } from "./utils.ts";

const data = {
  qwerty: ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
} as const;

const lines: Record<string, string[][]> = Object.fromEntries(
  Object.entries(data).map(([key, lines]) => [
    key,
    lines.map((line) => [...new Set(line.split(""))]),
  ])
);

const howManyLines = (word: string, lines: string[][]): number => {
  const lineIndices = new Set<number>();

  word
    .toLowerCase()
    .split("")
    .forEach((char) => {
      lines.forEach((line, lineIndex) => {
        if (line.includes(char)) {
          lineIndices.add(lineIndex);
        }
      });
    });

  return lineIndices.size;
};

const oneRow = (
  words: string[],
  type: keyof typeof data = "qwerty",
  numLines = 1
): string[] => {
  return words.filter((word) => howManyLines(word, lines[type]) === numLines);
};

Deno.test("test", () => {
  assertEquals(
    oneRow(["candy", "fart", "pop", "Zelda", "flag", "Typewriter"]),
    ["pop", "flag", "Typewriter"]
  );
});
