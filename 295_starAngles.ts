import { assertEquals } from "./utils.ts";

type Point = [number, number];
type Vector = [number, number];

const getPointPosition = (step: number, angleStep: number): Point => {
  const angle = angleStep * step;
  return [Math.cos(angle), Math.sin(angle)];
};

const normalize = (v: Vector): Vector => {
  const length = Math.sqrt(v[0] * v[0] + v[1] * v[1]);

  v[0] /= length;
  v[1] /= length;

  return v;
};

const getStarAngle = (pointsCount: number): number => {
  const angleStep = (Math.PI * 2) / pointsCount;

  const p0 = getPointPosition(0, angleStep);
  const p1 = getPointPosition(-2, angleStep);
  const p2 = getPointPosition(2, angleStep);

  // p0 to p1
  const v0: Vector = normalize([p1[0] - p0[0], p1[1] - p0[1]]);
  // p0 to p2
  const v1: Vector = normalize([p2[0] - p0[0], p2[1] - p0[1]]);

  const radians = Math.acos(v0[0] * v1[0] + v0[1] * v1[1]);
  const degrees = radians * 57.29578;

  return Math.round(degrees * pointsCount);
};

Deno.test("test", () => {
  assertEquals(getStarAngle(5), 180);
  assertEquals(getStarAngle(6), 360);
});
