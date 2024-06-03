import heroes, { type Owner, owners } from "../data/heroes";

console.log(owners, heroes);

export const getHeroById = (id:number) => {
  return heroes.find( hero => hero.id === id) ?? null;
}

export const getHeroesByOwner = (owner:Owner) => {
  return heroes.filter( heroe => heroe.owner === owner);
}
