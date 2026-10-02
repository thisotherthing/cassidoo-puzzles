import { assertEquals } from "./utils.ts";

// Write a function that makes an ASCII "honeycomb" shape of a given size.

const drawHex = (cx: number, cy: number, size: number, canvas: string[][]) => {
  const halfSize = size / 2;

  // draw top and bottom
  for (const y of [cy - halfSize, cy + halfSize]) {
    for (let x = -halfSize; x < halfSize; x++) {
      canvas[y][cx + x] = "_";
    }
  }

  // draw / sides
  for (
    const coord of [{ x: -size, y: 0 }, { x: halfSize, y: halfSize }]
  ) {
    for (let i = 0; i < halfSize; i++) {
      canvas[cy + coord.y - i][cx + coord.x + i] = "/";
    }
  }

  // draw \ sides
  for (
    const coord of [
      { x: size - 1, y: 0 },
      {
        x: -halfSize - 1,
        y: halfSize,
      },
    ]
  ) {
    for (let i = 0; i < halfSize; i++) {
      canvas[cy + coord.y - i][cx + coord.x - i] = "\\";
    }
  }
};

function* getHexOffsets(size: number): Generator<{ x: number; y: number }> {
  // center
  // yield { x: 0, y: 0 };

  // top
  yield { x: 0, y: -size };

  // bottom
  yield { x: 0, y: size };

  const halfSize = size / 2;

  // TL
  yield { x: -size - halfSize, y: -halfSize };

  // BL
  yield { x: -size - halfSize, y: halfSize };

  // TR
  yield { x: size + halfSize, y: -halfSize };

  // BR
  yield { x: size + halfSize, y: halfSize };
}

const getCanvasString = (canvas: string[][]) => {
  const result = "\n" + canvas.map((v) =>
    `${
      // add padding to start
      "".padStart(2, " ")}${
      v.join("")
        // remove whitespace at end
        .trimEnd()
    }`
  ).join("\n") + "\n";

  return result;
};

const honeycomb = (size: number): string => {
  if (size < 2 || size % 2 !== 0) {
    throw new Error("size needs to be at least 2, and be divisible by");
  }

  const totalWidth = Math.ceil(size * 2 * 2.5);

  // lines count is 3 hexes, plus an extra line, for the top
  const linesCount = size * 3 + 1;

  const canvas: string[][] = new Array(linesCount).fill(null).map(() =>
    new Array(totalWidth).fill(null).map(() => " ")
  );

  const centerX = size * 2.5;
  const centerY = size * 1.5;

  for (const coord of getHexOffsets(size)) {
    drawHex(centerX + coord.x, centerY + coord.y, size, canvas);
  }

  const result = getCanvasString(canvas);

  console.log(result.replaceAll(" ", "."));

  return result;
};

Deno.test("2", () => {
  assertEquals(
    honeycomb(2),
    String.raw`
      __
   __/  \__
  /  \__/  \
  \__/  \__/
  /  \__/  \
  \__/  \__/
     \__/
`,
  );
});
Deno.test("4", () => {
  assertEquals(
    honeycomb(4),
    String.raw`
          ____
         /    \
    ____/      \____
   /    \      /    \
  /      \____/      \
  \      /    \      /
   \____/      \____/
   /    \      /    \
  /      \____/      \
  \      /    \      /
   \____/      \____/
        \      /
         \____/
`,
  );
});
