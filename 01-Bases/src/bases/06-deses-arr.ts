const characters = [ 'Goku', 'Vegeta', 'Trunks', 'Goten' ]

const [,,t] = characters;

console.log(t);

const returnArray = () => {
  return [123, 'ABC'] as const;
}

const [ numbers, letters ] = returnArray();

console.log(numbers * 2, letters.toLowerCase());
