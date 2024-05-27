export const person = {
  lastName: "Stark",
  age: 45,
  address: {
    city: "New York",
    zip: 51232,
    lat: 14.23323,
    lng: 34.556,
  },
} //as const;


// const person2 = {...person};
const person2 = structuredClone(person);

person2.lastName = "Parker"
person2.address.city = "LA"

console.log({person});
console.log({person2});
