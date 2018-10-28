export const randomInteger = (min, max) => {
  const range = max - min;

  return min + Math.round(Math.random() * range);
};
