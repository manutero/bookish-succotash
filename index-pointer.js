function IndexPointer(max) {
  let i = 0;
  return {
    current: () => i,
    prev: () => {
      i--;
      if (i < 0) i = max;
      return i;
    },
    next: () => {
      i++;
      if (i > max) i = 0;
      return i;
    }
  };
}
