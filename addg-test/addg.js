export function addg(a) {
  if (a === undefined) return a;
  return function g(b) {
    if (b !== undefined) {
      return addg(a+b);
    }
    return a;
  };
}

// Example usage:
/*
  addg() // undefined
  addg(2)() // 2
  addg(2)(7)() // 9
  addg(3)(4)(0)() // 7
*/