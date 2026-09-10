import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

export { assertEquals };

export const parseExample = (
  input: string,
): {
  description: string;
  name: string;
  example: string;
} => {
  let description = "";
  let exampleCode = input;

  // check if description was pasted, we want that as a comment
  // https://regex101.com/?regex=%5BEe%5Dxample%3A&testString=Example%3A%0Aexample%3A&flags=gm&flavor=javascript&delimiter=%2F
  if (exampleCode.includes("Example:\n")) {
    const split = exampleCode.trim().split(/[Ee]xample:/);

    if (split.length !== 2) {
      throw new Error(`there should only be one "Example:"! in the input`);
    }

    // example is in the second part
    exampleCode = split[1].trim();

    // check description
    const commentLines = split[0].trim().split("\n");

    // remove the headline of the challenge, if present
    if (commentLines[0].includes("question:")) {
      commentLines.shift();
    }

    description = commentLines.join("\n");
  }

  const data = exampleCode
    .split(">")
    .map((v) => v.trim())
    .filter(Boolean);

  const name = data[0].split("(")[0].trim();
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
      `assertEquals(${data[i]}, ${result});${
        comment.length === 0 ? "" : ` // ${comment}`
      }`,
    );
  }

  return {
    description: description,
    name,
    example: examples.join("\n"),
  };
};

Deno.test("test", async (t) => {
  await t.step("example test generation", () => {
    assertEquals(
      parseExample(
        "> separateAndSort([4,3,2,1,5,7,8,9]) > [[2,4,6], [1,3,5,7,9]] > separateAndSort([1,1,1,1]) > [[], [1,1,1,1]]",
      ),
      {
        description: "",
        name: "separateAndSort",
        example:
          "assertEquals(separateAndSort([4,3,2,1,5,7,8,9]), [[2,4,6], [1,3,5,7,9]]);\nassertEquals(separateAndSort([1,1,1,1]), [[], [1,1,1,1]]);",
      },
    );
    assertEquals(
      parseExample(
        "> maxPointsOnLine([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]) > 4",
      ),
      {
        description: "",
        name: "maxPointsOnLine",
        example:
          "assertEquals(maxPointsOnLine([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]), 4);",
      },
    );
    assertEquals(
      parseExample(
        "> isIsomorphic('abb', 'cdd') > true // 'a' maps to 'c' and 'b' maps to 'd'",
      ),
      {
        description: "",
        name: "isIsomorphic",
        example:
          "assertEquals(isIsomorphic('abb', 'cdd'), true); // 'a' maps to 'c' and 'b' maps to 'd'",
      },
    );
  });

  await t.step("example description", () => {
    assertEquals(
      parseExample(
        "Example:\n> separateAndSort([4,3,2,1,5,7,8,9]) > [[2,4,6], [1,3,5,7,9]]",
      ),
      {
        description: "",
        name: "separateAndSort",
        example:
          "assertEquals(separateAndSort([4,3,2,1,5,7,8,9]), [[2,4,6], [1,3,5,7,9]]);",
      },
    );
    assertEquals(
      parseExample(
        "This week's question:\nasd\nExample:\n> separateAndSort([4,3,2,1,5,7,8,9]) > [[2,4,6], [1,3,5,7,9]]",
      ),
      {
        description: "asd",
        name: "separateAndSort",
        example:
          "assertEquals(separateAndSort([4,3,2,1,5,7,8,9]), [[2,4,6], [1,3,5,7,9]]);",
      },
    );
  });
});
