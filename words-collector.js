function WordsCollector() {
  const set = new Set();

  const isValid = str => str.length > 3 && /^[a-zA-Z]+$/.test(str);

  const elementHasNoChildrenAndNotEmpty = element =>
    element.children.length === 0 &&
    element.textContent.replace(/ |\n/g, "") !== "";

  const allTexts = () => {
    const elements = document.body.getElementsByTagName("*");
    for (const current of elements) {
      if (elementHasNoChildrenAndNotEmpty(current)) {
        current.textContent.split(" ").forEach(str => {
          if (isValid(str)) {
            set.add(str);
          }
        });
      }
    }
    console.log(set);
    return Array.from(set);
  };

  return {
    getCurrentWords: (n = 5) => allTexts().slice(0, n)
  };
}
