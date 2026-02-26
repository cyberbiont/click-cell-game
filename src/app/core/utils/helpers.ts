export function getRandomArrayElement<T>(array: [T, ...T[]]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function isArrayNotEmpty<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0;
}
