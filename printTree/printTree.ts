const printTree = (count: number): string => {
  if (count == 1) {
    return "/";
  }

  const stringBuilder: string[] = [];
  const lineBuilder: string[] = [];

  // set end line
  // we start with it, and then solve it backwards
  {
    const numLines = Math.ceil(Math.log(count)/Math.log(2));
    lineBuilder.length = 0;

    const lineLenth = Math.pow(2, numLines);

    const perLine = Math.min(count, lineLenth);

    // add pairs
    for (let i = 0; i < perLine; i++) {
      // handle lines, where last line isn't all pairs
      // we want them to end with \
      // and have the right number spaces in front, so the rest of the solver works
      if (i + 1 === perLine && count !== lineLenth) {
        if (count % 2 === 1) {
          // for uneven numbers, we want just one space in between, to make the tree a bit tighter
          lineBuilder[lineBuilder.length-1] = lineBuilder[lineBuilder.length-1].slice(0, -1);
        }
        lineBuilder.push("\\");
        break;
      }
      lineBuilder.push(i % 2 === 0 ? "/" : "\\  ");
    }

    stringBuilder.push(lineBuilder.join("").trim());
  }

  // build lines above
  // length 2 means we reached "/\"
  while (stringBuilder[0].trim().length > 2) {
    lineBuilder.length = 0;

    let goingRight = true;

    const endTrimmedPrevLine = stringBuilder[0].trimEnd();

    for (let i = 0, l = endTrimmedPrevLine.length; i < l; i++) {
      // find node going right
      if (goingRight && i + 1 < l && i > 0 && endTrimmedPrevLine[i-1] === "/" && endTrimmedPrevLine[i] === "\\") {
        lineBuilder.push("/");

        // alternate directions
        goingRight = false;
        continue;
      }
      // find node going left
      if (
        // override direction toggle at the end of the line
        (!goingRight || i + 2 === l)
        && endTrimmedPrevLine[i] === "/" && endTrimmedPrevLine[i+1] === "\\"
      ) {
        lineBuilder.push("\\ ");

        // alternate directions
        goingRight = true;

        // skip ahead, since otherwise going right on the node would also trigger
        i++;
        continue;
      }

      // continue going right
      if (i > 0 && endTrimmedPrevLine[i-1] === "/" && endTrimmedPrevLine[i] !== "\\") {
        lineBuilder.push("/")
        continue;
      }

      // continue goind left
      if (i > 0 && endTrimmedPrevLine[i] !== "/" && endTrimmedPrevLine[i+1] === "\\") {
        lineBuilder.push("\\")
        continue;
      }

      lineBuilder.push(" ");
    }

    stringBuilder.unshift(lineBuilder.join("").trimEnd());

  }

  const result = stringBuilder.join("\n");

  return result;
}

printTree(3);

import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
Deno.test("check print trees", () => {
  const expectedResults = Deno.readTextFileSync("printTree/printTreeTests.txt");
  expectedResults.split("tree").filter(Boolean).forEach((line) => {
    const number = parseInt(line.match(/ \d+\s/)![0], 10);
    const expectedResult = line.replace(/ \d+\s/, "").trimEnd();

    assertEquals(printTree(number), expectedResult);
  })
})
