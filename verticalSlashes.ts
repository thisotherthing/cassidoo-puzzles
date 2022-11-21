const verticalSlashes = (slashes: string): string => {
  const stringBuilder: string[] = [];

  let indent = 0;
  let dir = "\\";

  slashes
    .trim()
    .split("")
    .map((slash) => {
      if (slash !== dir) {
        // if direction changes keep indent the same
      }
      if (slash === dir) {
        if (slash === "/") {
          indent--;
        } else {
          indent++;
        }
      }
      stringBuilder.push(slash.padStart(indent + 1, " "));

      dir = slash;
    });

  const result = stringBuilder.join("\n");
  console.log(slashes);
  console.log("");
  console.log(result);
  console.log("");
  return result;
};

verticalSlashes(String.raw`\\\//\/\\`);
verticalSlashes(String.raw`\\\\`);
