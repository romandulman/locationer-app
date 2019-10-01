export const sortByAbc = arr => {
  return arr.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

export const sortByCat = arr => {
  return arr.sort((a, b) => (a.category > b.category ? 1 : -1));
};
