// const numberArray = [1, 2, 3, 4, 5] as const;
export const numberArray = [1, 2, 3, 4, 5];
const numberArray2:(number|string)[] = [...numberArray];

numberArray.push(6)
numberArray2.push('7')

const numberArray3 = numberArray.map(value => value);

console.log({numberArray});
