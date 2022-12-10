export const currencyConverter = (origin, destination, ammount) => {
  if (origin == destination) {
    return ammount;
  } else if (origin == 2 && destination == 1) {
    return ammount * 7.78;
  } else {
    return ammount * 0.13;
  }
  4;
};

export const generateDate = () => {
  const today = new Date().toLocaleDateString("es-GT").split("T")[0];
  const todaysDate = today.split("/").reverse().join("/").replace(/[\/]/g, "-");

  return todaysDate;
};
