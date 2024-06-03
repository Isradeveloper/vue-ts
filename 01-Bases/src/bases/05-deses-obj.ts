interface Hero {
  name: string;
  age: number;
  codeName: string;
  power?: string;
}

export const person:Hero = {
  name: 'Tony',
  age: 45,
  codeName: 'Ironman',
  // power
}

const { name, age, codeName, power = 'No tiene ningún poder' } = person;

console.log({name, age, codeName, power});


interface createHeroArgs {
  name: string;
  age: number;
  codeName: string;
  power?: string;
}

const createHero = ( {name, age, codeName, power}: createHeroArgs ) => ({
  id: 123123,
  name,
  age,
  codeName,
  power: power ?? "No tiene poder",
})

