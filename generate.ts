import { assertEquals } from "./utils.ts";

import {
  Input,
  Number,
  prompt,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";

const parseExample = (
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
    examples.push(`assertEquals(${data[i]}, ${data[i + 1]});`);
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
});

const result = await prompt([
  {
    name: "issue",
    message: "What's the issue number?",
    type: Number,
  },
  {
    name: "example",
    message: "What's the example?",
    type: Input,
  },
]);

console.log({ result });
const parsed = parseExample(result.example || "");

const contentBuilder: string[] = [];

contentBuilder.push(`import { assertEquals } from "./utils.ts";`);
contentBuilder.push(`const ${parsed.name} = (input: number): number => {
  return input + 1;
};`);

contentBuilder.push(`Deno.test("test", () => {
  ${parsed.example}
});`);

const path = `${result.issue}_${parsed.name}.ts`;

Deno.writeTextFileSync(path, contentBuilder.join(`\n\n`));

new Deno.Command("deno", { args: [`fmt ${path}`] }).outputSync();
new Deno.Command("code", { args: [path] }).outputSync();
