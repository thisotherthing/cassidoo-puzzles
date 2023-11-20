import { assertEquals } from "./utils.ts";

type Point = [number, number];

// based on https://stackoverflow.com/a/3813755
const arePointsOnLine = (p0: Point, p1: Point, p2: Point): boolean => {
  const area =
    p0[0] * (p1[1] - p2[1]) + p1[0] * (p2[1] - p0[1]) + p2[0] * (p0[1] - p1[1]);

  return area < 0.000001;
};

const checkPointsOnLine = (
  points: Point[],
  onLinePoints: number[],
  startIndex: number,
  result: { maxPointsOnLine: number }
) => {
  onLinePoints.push(startIndex);

  if (onLinePoints.length >= 3) {
    if (
      arePointsOnLine(
        points[onLinePoints.at(-1)!],
        points[onLinePoints.at(-2)!],
        points[onLinePoints.at(-3)!]
      )
    ) {
      result.maxPointsOnLine = Math.max(
        result.maxPointsOnLine,
        onLinePoints.length
      );
    } else {
      onLinePoints.pop();
      return;
    }
  }

  for (let i = startIndex + 1, l = points.length; i < l; i++) {
    checkPointsOnLine(points, onLinePoints, i, result);
  }

  onLinePoints.pop();
};

const maxPointsOnLine = (points: Point[]): number => {
  const result = { maxPointsOnLine: 0 };

  for (let i = 0, l = points.length; i < l; i++) {
    checkPointsOnLine(points, [], i, result);
  }

  return result.maxPointsOnLine;
};

Deno.test("test", () => {
  assertEquals(
    maxPointsOnLine([
      [1, 1],
      [3, 2],
      [5, 3],
      [4, 1],
      [2, 3],
      [1, 4],
    ]),
    4
  );
});
