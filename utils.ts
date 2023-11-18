import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

export { assertEquals };

export const parseExample = (
  input: string
): {
  name: string;
  example: string;
} => {
  const data = input
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
      }`
    );
  }

  return {
    name,
    example: examples.join("\n"),
  };
};

Deno.test("test", () => {
  assertEquals(
    parseExample(
      "> separateAndSort([4,3,2,1,5,7,8,9]) > [[2,4,6], [1,3,5,7,9]] > separateAndSort([1,1,1,1]) > [[], [1,1,1,1]]"
    ),
    {
      name: "separateAndSort",
      example:
        "assertEquals(separateAndSort([4,3,2,1,5,7,8,9]), [[2,4,6], [1,3,5,7,9]]);\nassertEquals(separateAndSort([1,1,1,1]), [[], [1,1,1,1]]);",
    }
  );
  assertEquals(
    parseExample(
      "> maxPointsOnLine([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]) > 4"
    ),
    {
      name: "maxPointsOnLine",
      example:
        "assertEquals(maxPointsOnLine([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]), 4);",
    }
  );
  assertEquals(
    parseExample(
      "> isIsomorphic('abb', 'cdd') > true // 'a' maps to 'c' and 'b' maps to 'd'"
    ),
    {
      name: "isIsomorphic",
      example:
        "assertEquals(isIsomorphic('abb', 'cdd'), true); // 'a' maps to 'c' and 'b' maps to 'd'",
    }
  );
});
