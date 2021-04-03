type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Jorge',
  privileges: ['create-server'],
  startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string')
    return a.toString() + b.toString();
  else return a + b;
}

const result = add('Jorge', ' Gonçalves');
result.split(' ');

const fetchedUserData = {
  id: 'u1',
  name: 'Jorge'
  //   job: { title: 'Software engineer', description: 'He develops software.' }
};

//javascript nativo para aceder a propriedades embebidas que podem não existir
// console.log(fetchedUserData.job && fetchedUserData.job.title);

// console.log(fetchedUserData?.job?.title);

const userInput = null;

const storedData = userInput ?? 'DEFAULT';

// type unknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: unknownEmployee) {
//   console.log('Name: ' + emp.name);
//   if ('privileges' in emp) console.log('Privileges: ' + emp.privileges);
//   if ('startDate' in emp) console.log('Privileges: ' + emp.startDate);
// }

// printEmployeeInformation(e1);
// printEmployeeInformation({ name: 'Rafa', startDate: new Date() });

// class Car {
//   drive() {
//     console.log('Driving...');
//   }
// }

// class Truck {
//   drive() {
//     console.log('Driving a truck');
//   }
//   loadCargo(amount: number) {
//     console.log('Loading cargo ...' + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   if ('loadCargo' in vehicle) vehicle.loadCargo(1000);

//   // OR
//   if (vehicle instanceof Truck) vehicle.loadCargo(1000);
// }

// interface Bird {
//   type: 'bird'; // type asignment
//   flyingSpeed: number;
// }

// interface Horse {
//   type: 'horse';
//   groundSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;
//     case 'horse':
//       speed = animal.groundSpeed;
//       break;
//   }
//   console.log('Moving with speed: ' + speed);
// }

// moveAnimal({ type: 'bird', flyingSpeed: 10 });

// const userInput = <HTMLInputElement>document.getElementById('user-input')!; //Declara que nunca vai retornar null
// const userInput2 = document.getElementById('user-input2') as HTMLInputElement;
// const userInput3 = document.getElementById('user-input3');

// userInput.value = 'Hi there!';

// if (userInput3) {
//   // verificar se é truthy
//   userInput2.value = 'I dont exist';
// }

// interface ErrorContainer {
//   //id: string; //todas as outras propriedades default devem de ter valores com o mesmo tipo, no caso string.
//   [prop: string]: string;
//   // a chave da propriedade deve ser uma string e o valor, também uma string.
// }

// const errorBag: ErrorContainer = {
//   email: 'Not a valid email.',
//   username: 'Must start with a capital character.'
// };
