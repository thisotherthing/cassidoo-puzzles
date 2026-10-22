import { expect, test } from "vitest";
import { parseExample } from "./utils.js";

test("example test generation", () => {
  expect(parseExample(
    "> separateAndSort([4,3,2,1,5,7,8,9]) > [[2,4,6], [1,3,5,7,9]] > separateAndSort([1,1,1,1]) > [[], [1,1,1,1]]",
  )).toStrictEqual(
    {
      description: "",
      name: "separateAndSort",
      example:
        "expect(separateAndSort([4,3,2,1,5,7,8,9])).toBe([[2,4,6], [1,3,5,7,9]]);\nexpect(separateAndSort([1,1,1,1])).toBe([[], [1,1,1,1]]);",
    },
  );
  expect(parseExample(
    "> maxPointsOnLine([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]) > 4",
  )).toStrictEqual({
    description: "",
    name: "maxPointsOnLine",
    example:
      "expect(maxPointsOnLine([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]])).toBe(4);",
  });

  expect(parseExample(
    "> isIsomorphic('abb', 'cdd') > true // 'a' maps to 'c' and 'b' maps to 'd'",
  )).toStrictEqual({
    description: "",
    name: "isIsomorphic",
    example:
      "expect(isIsomorphic('abb', 'cdd')).toBe(true); // 'a' maps to 'c' and 'b' maps to 'd'",
  });
});

test("example description", () => {
  expect(
    parseExample(
      "Example:\n> separateAndSort([4,3,2,1,5,7,8,9]) > [[2,4,6], [1,3,5,7,9]]",
    ),
  ).toStrictEqual(
    {
      description: "",
      name: "separateAndSort",
      example:
        "expect(separateAndSort([4,3,2,1,5,7,8,9])).toBe([[2,4,6], [1,3,5,7,9]]);",
    },
  );
  expect(
    parseExample(
      "This week's question:\nasd\nExample:\n> separateAndSort([4,3,2,1,5,7,8,9]) > [[2,4,6], [1,3,5,7,9]]",
    ),
  ).toStrictEqual(
    {
      description: "asd",
      name: "separateAndSort",
      example:
        "expect(separateAndSort([4,3,2,1,5,7,8,9])).toBe([[2,4,6], [1,3,5,7,9]]);",
    },
  );
});
