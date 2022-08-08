const swapPairs = (arr: number[]): number[] => {

  // let tmp: number = 0;
  for (let i = 0, l = arr.length; i < l; i += 2) {
    if (i + 1 < l) {
      // tmp = arr[i];
      // arr[i] = arr[i+1];
      // arr[i+1] = tmp;
      [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
    }
  }

  return arr;
}

console.log(swapPairs([1,2,3,4]));
// [2,1,4,3]

console.log(swapPairs([]));
//[]