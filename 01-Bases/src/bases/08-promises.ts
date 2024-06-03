import { Hero } from "../data/heroes";
import { getHeroById } from "./07-imp-exp";

console.log("Inicio");

new Promise((resolve, reject) => {

  // resolve('Mi amigo cumplió')
  reject('Mi amigo NO cumplió')


})
  .then((message) => console.log(message))
  .catch((errorMessage) => console.log(errorMessage))
  .finally(() => console.log("Fin de la promesa"))

console.log("Final");



const getHeroByIdAsync = (id: number): Promise<Hero> => {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      const hero = getHeroById(id);

      (hero) ? resolve(hero) :  reject(`No se encontró heroe con el ID ${id}`)

    }, 1500);

  })

}

getHeroByIdAsync(1)
  .then(hero => console.log(`El nombre es ${hero.name}`))
  .then(alert)