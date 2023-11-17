import { assertEquals } from "./utils.ts";

const mmmPie = (
  people: { name: string; num: number }[],
  piecesPerPie: number
): number =>
  Math.ceil(
    Object.values(people).reduce((prev, cur) => prev + cur.num, 0) /
      piecesPerPie
  );

Deno.test("test", () => {
  assertEquals(
    mmmPie(
      [
        { name: "Joe", num: 9 },
        { name: "Cami", num: 3 },
        { name: "Cassidy", num: 4 },
      ],
      8
    ),
    2
  );
});
