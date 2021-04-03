type Combinable = number | string;
type ConvertionDescriptor = 'as-number' | 'as-text';

function combine(
  n1: Combinable,
  n2: Combinable,
  resultConvertion: ConvertionDescriptor
) {
  let result;
  if (
    (typeof n1 === 'number' && typeof n2 === 'number') ||
    resultConvertion === 'as-number'
  )
    result = +n1 + +n2;
  else result = n1.toString() + n2.toString();
  return result;
}

const combineAges = combine(30, 26, 'as-number');
console.log(combineAges);

const combineStringAges = combine('30', '26', 'as-number');
console.log(combineStringAges);

const combineNames = combine('Jorge', 'Rafa', 'as-text');
console.log(combineNames);
 