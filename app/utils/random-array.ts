export const randomArray = (total = 50) => {
  const data = [];
  for (let element = 0; element < total; element += 1) {
    const y = Math.floor(Math.random() * 50) + 50;
    const obj = {
      x: element,
      y,
    };
    data.push(obj);
  }
  return data;
};
