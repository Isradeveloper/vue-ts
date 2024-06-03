// function greetPerson( name: String ){
//   return `Hola, ${ name }`;
// }

// const greetPerson = (name:String):String => {
//   return `Hola, ${ name }`;
// }

const greetPerson = (name: String): String => `Hola, ${name}`;

// const getUser = () => {
//   return {
//     uid: 'ABC-123',
//     username: 'Tony001'
//   }
// }

const getUser = (uid: string) => ({

  uid,
  username: 'Tony001'

})


const heroes = [

  {
    id: 1,
    name: 'Batman',
  },
  {
    id: 2,
    name: 'Superman',
    power: 'Super fuerza',
  },

];

const hero = heroes.find( (h) => h.id === 1 );
console.log(hero?.power?.toUpperCase());
