import { Input, Number, prompt } from "@cliffy/prompt";
import prettier from "@prettier/sync";

import { parseExample } from "./utils.ts";
import { writeFileSync } from "node:fs";
import { execSync, spawn } from "node:child_process";

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

contentBuilder.push(`import { expect, test } from "vitest";`);

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

contentBuilder.push(`test("test", () => {
  ${parsedExample.example}
});`);

const path = `${result.issue}_${parsedExample.name}.test.ts`;

let code = contentBuilder.join(`\n\n`);

try {
  code = prettier.format(code, { parser: "typescript", printWidth: 80 });
} catch (e) {
  console.warn(e);
}

writeFileSync(path, code);

// try {
//   spawn(DEFAULT_EDITOR, [path]);
// } catch (e) {
//   console.warn(
//     `Could not open file in editor, configured is "${DEFAULT_EDITOR}", error: [${e}]`,
//   );
// }

console.info(`you can run the example with:\npnpm test "${path}"`);
