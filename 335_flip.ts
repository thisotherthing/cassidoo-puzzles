import { assertEquals } from "./utils.ts";

// Given a 2D array, write a function that flips it vertically or horizontally.

const flip = (input: number[][], func: "vertical" | "horizontal"): number[][] => {
 // we do not want to mutate the input array
 const array = structuredClone(input);

 switch(func) {
  case "vertical": 
    array.reverse();

    return array;
  case "horizontal":
    for (const line of array) {
      line.reverse();
    }
    return array;
 }
};


Deno.test("test", () => {
  const array = [ [1,2,3], [4,5,6], [7,8,9] ]

  assertEquals(flip(array, "horizontal"), [[3,2,1],[6,5,4],[9,8,7]]);
  assertEquals(flip(array, 'vertical'), [[7,8,9],[4,5,6],[1,2,3]]);
});
