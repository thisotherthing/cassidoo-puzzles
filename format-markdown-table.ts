const format = (input: string): string => {
  console.log(`Input:\n${input.trim()}`);

  const data = input.trim().split("\n");

  const rowWidths: number[] = [];

  // get max line lengths
  data.forEach(line => {
    const split = line.split("|").filter(v => v.trim().length > 0);

    if (rowWidths.length === 0) {
      split.forEach(split => rowWidths.push(split.trim().length));
    } else {
      split.forEach((split, i) => rowWidths[i] = Math.max(rowWidths[i], split.trim().length));
    }
  });

  // build formatted result
  const resultBuilder: string[] = [];
  data.forEach(line => {
    const split = line.split("|").filter(v => v.trim().length > 0);

    resultBuilder.push("| ");
    split.forEach((s, i) => {
      // pad with spaces, or with dashes for lines
      resultBuilder.push(s.trim().padEnd(rowWidths[i], s.match(/^\s-+\s$/) ? "-" : " "))

      // end line with newline
      if (i === split.length - 1) {
        resultBuilder.push(" |\n");
      } else {
        resultBuilder.push(" | ");
      }
    });

  });

  const result = resultBuilder.join("");
  console.log(`Output:\n${result}`);
  return result;
}

format(
  `
  | Syntax | Description |
  | --- | ----------- |
  | Header | Title |
  | Paragraph | Text |
  `
);
