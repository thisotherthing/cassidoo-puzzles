const numberOfOnes = (n: number): number => {
  const valid: number[] = [];

  for (let i = 1; i <= n; i++) {
    if (i.toFixed(0).includes("1")) valid.push(i);
  }

  console.log(valid);
  
  return (valid.join("").match(/1/g) || []).length;
}

console.log(numberOfOnes(14));
