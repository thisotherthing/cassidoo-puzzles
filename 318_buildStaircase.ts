import { assertEquals } from "./utils.ts";

const buildStaircase = (input: number): number => {
  let steps = 0;
  let needed = 1;
  while (input > 0) {
    steps++;
    needed++;

    input -= needed;
  }
  return steps;
};

// #

// #
// ##

// #
// ##
// ###

// #
// ##
// ###
// ####

Deno.test("test", () => {
  assertEquals(buildStaircase(6), 3);
  assertEquals(buildStaircase(9), 3); // it takes 10 blocks to make 4 steps
  assertEquals(buildStaircase(10), 4); // it takes 10 blocks to make 4 steps
});
