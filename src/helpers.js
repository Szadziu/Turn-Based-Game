export function getRandomFloat(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) / 100;

  // const str = (Math.random() * (max - min) + min).toFixed(2);

  // return parseFloat(str);
}
