export const parseExample = (
  input: string,
): {
  description: string;
  name: string;
  example: string;
} => {
  const result = {
    description: "",
    name: "",
    example: input,
  };

  // check if description was pasted, we want that as a comment
  // https://regex101.com/?regex=%5BEe%5Dxample%3A&testString=Example%3A%0Aexample%3A&flags=gm&flavor=javascript&delimiter=%2F
  if (result.example.includes("Example:\n")) {
    const split = result.example.trim().split(/[Ee]xample:/);

    if (split.length !== 2) {
      throw new Error(`there should only be one "Example:"! in the input`);
    }

    // example is in the second part
    result.example = split[1].trim();

    // check description
    const commentLines = split[0].trim().split("\n");

    // remove the headline of the challenge, if present
    if (commentLines[0].includes("question:")) {
      commentLines.shift();
    }

    result.description = commentLines.join("\n");
  }

  if (result.example.trim().length > 0) {
    const data = result.example
      .split(">")
      .map((v) => v.trim())
      .filter(Boolean);

    result.name = data[0].split("(")[0].trim();
    const examples: string[] = [];

    for (let i = 0, l = data.length; i < l; i += 2) {
      let comment = "";
      let result = data[i + 1].trim();

      if (result.includes("//")) {
        const split = result.split("//");
        result = (split.shift() as string).trim();
        comment = split.map((v) => v.trim()).join("\n // ");
      }

      examples.push(
        `expect(${data[i]}).toBe(${result});${
          comment.length === 0 ? "" : ` // ${comment}`
        }`,
      );
    }

    result.example = examples.join("\n");
  }

  return result;
};
