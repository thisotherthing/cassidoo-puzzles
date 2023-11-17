import { assertEquals } from "./utils.ts";

const justifyText = (words: string[], expectedLineLength: number): string[] => {
  const wordLines: string[][] = [];

  // split words into lines
  {
    const getSpacedLineLength = (words: string[]): number => {
      return (
        words.length - 1 + words.reduce((prev, curr) => prev + curr.length, 0)
      );
    };

    const currentWordLine: string[] = [];

    for (const word of words) {
      currentWordLine.push(word);

      if (getSpacedLineLength(currentWordLine) > expectedLineLength) {
        currentWordLine.pop();
        wordLines.push([...currentWordLine]);

        currentWordLine.length = 0;
        currentWordLine.push(word);
      }
    }

    wordLines.push(currentWordLine);
  }

  console.log({ wordLines });

  const lines: string[] = [];

  // justify lines
  {
    const getUnspacedLineLength = (words: string[]) =>
      words.reduce((prev, curr) => prev + curr.length, 0);

    for (const line of wordLines) {
      // if there is just one word, pad it at the end
      if (line.length === 1) {
        lines.push(line[0].padEnd(expectedLineLength, " "));
        continue;
      }

      const idealSpacing =
        (expectedLineLength - getUnspacedLineLength(line)) / (line.length - 1);
      console.log({ line }, { idealSpacing });
      const firstSpacing = "".padEnd(Math.ceil(idealSpacing), " ");
      const spacing = "".padEnd(Math.max(1, Math.floor(idealSpacing)), " ");

      lines.push(
        [line.slice(0, 2).join(firstSpacing), ...line.slice(2)].join(spacing)
      );
    }
  }

  return lines;
};

Deno.test("test", () => {
  assertEquals(
    justifyText(
      ["This", "is", "an", "example", "of", "text", "justification."],
      16
    ),
    ["This    is    an", "example  of text", "justification.  "]
  );
});
