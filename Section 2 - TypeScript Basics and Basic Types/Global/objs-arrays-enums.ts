// const person: {
//   name:string;
//   age: number
// } = {
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: 'Jorge',
//   age: 30,
//   hobbies: ['Sports', 'Reading'],
//   role: [2, 'author']
// };

enum Role {
  ADMIN = 5,
  READ_ONLY = 100,
  AUTHOR = 200
}

const person = {
  name: 'Jorge',
  age: 30,
  hobbies: ['Sports', 'Reading'],
  role: Role.AUTHOR
};

// person.role = ['', 1];
// person.role = [1, 'other', ''];

// let favoriteActivities: string[];
// favoriteActivities = ['Sports'];

console.log(person.name);

if (person.role === Role.AUTHOR) console.log('is author');

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
