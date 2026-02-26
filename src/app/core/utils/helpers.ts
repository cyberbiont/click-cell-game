export function getRandomArrayElement<T>(array: T[]): T {
  const element = array.at(Math.floor(Math.random() * array.length));

  if (element === undefined) {
    throw new Error('Cannot get element from an empty array'); // This is just a type guard, bever should happen IRL
  }
  return element;
}
