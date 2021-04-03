const add = (n1: number, n2: number = 0) => n1 + n2;

const printResult: (a: string | number) => void = () => console.log(add(1, 2));

const button = document.querySelector('button');

if (button) button.addEventListener('click', (event) => console.log(event));

const hobbies = ['Sports', 'Reading'];

const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);

console.log(activeHobbies);
