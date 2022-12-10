const arr = [
  { name: "victor", age: 31 },
  { name: "Alejandra", age: 22 },
];

const programmer = arr.filter((person) => person.age === 22);

console.log(programmer);
