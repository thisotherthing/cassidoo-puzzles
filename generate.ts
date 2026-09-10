import { Input, Number, prompt } from "@cliffy/prompt";
import prettier from "@prettier/sync";

import { parseExample } from "./utils.ts";

const DEFAULT_EDITOR: string = "codium";

// prompt for number and example
const result = await prompt([
  {
    name: "issue",
    message: "What's the issue number?",
    type: Number,
  },
  {
    name: "description",
    message: "What's the description?",
    transform: (value) => value.trim(),
    type: Input,
  },
  {
    name: "example",
    message: "What's the example?",
    transform: (value) => value.trim(),
    type: Input,
  },
]);

// get cleaned example
const parsedExample = parseExample(result.example || "");

const contentBuilder: string[] = [];

contentBuilder.push(`import { assertEquals } from "./utils.ts";`);

if (result.description) {
  // keep newlines in description
  contentBuilder.push(
    result.description.split("\n").filter(Boolean).map((v) => `// ${v}`).join(
      "\n",
    ),
  );
}

contentBuilder.push(`const ${parsedExample.name} = (input: number): number => {
  return input + 1;
};`);

contentBuilder.push(`Deno.test("test", () => {
  ${parsedExample.example}
});`);

const path = `${result.issue}_${parsedExample.name}.ts`;

let code = contentBuilder.join(`\n\n`);
code = prettier.format(code, { parser: "typescript" });

Deno.writeTextFileSync(path, code);

try {
  new Deno.Command(DEFAULT_EDITOR, { args: [path] }).outputSync();
} catch (e) {
  console.warn(
    `Could not open file in editor, configured is "${DEFAULT_EDITOR}", error: [${e}]`,
  );
}

console.info(`you can run the example with "deno test ${path}"`);
