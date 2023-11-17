import { Number } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";

const number = Math.round(Math.random() * 100);

let numGuesses = 0;

console.log("Guess the number!");

while (true) {
  numGuesses++;

  const guess = await Number.prompt("Your guess:");

  if (guess > number) {
    console.log("lower");
    continue;
  }
  if (guess < number) {
    console.log("higher");
    continue;
  }

  if (guess === number) {
    break;
  }
}

console.log(`Correct! You won in ${numGuesses} guesses!`);
