import {
  Input,
  Number,
  prompt,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";

import { parseExample } from "./utils.ts";

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

console.log(`deno test ${path}`);
