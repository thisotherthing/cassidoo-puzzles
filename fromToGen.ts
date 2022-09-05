const fromTo = (start: number, end: number): () => number | undefined => {
  let cur = start;

  return () => {
    if (cur > end) return undefined;

    return cur++;
  };
}

const gen = fromTo(5,7);

console.log(gen()) // 5
console.log(gen()); // 6
console.log(gen()); // 7
console.log(gen()); // undefined