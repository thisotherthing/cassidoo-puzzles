import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

const passDoor = (numDoors: number, numberOfPasses: number): number => {
  const doors: boolean[] = new Array(numDoors).fill(null).map(_ => false);

  console.log("-", doors.map(open => open ? "0" : "1").join(" "));

  for (let i = 1; i <= numberOfPasses; i++) {
    doors.forEach((_, idx) => {
      if (idx % i + 1 === i) doors[idx] = !doors[idx];
    });
    console.log(i, doors.map(open => open ? "0" : "1").join(" "));
  }

  return doors.filter(Boolean).length;
}


Deno.test("passDoor", () => {
  assertEquals(passDoor(7, 3), 4);
});
