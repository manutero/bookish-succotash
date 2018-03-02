function WordsCollector() {
  const set = new Set();

  const foo = (str, matchingWord) =>
    matchingWord ? str.indexOf(matchingWord) !== -1 : true;

  const isValid = (str, matchingWord) => {
    return foo(str, matchingWord) && str.length > 3 && /^[a-zA-Z]+$/.test(str);
  };

  const elementHasNoChildrenAndNotEmpty = element =>
    element.children.length === 0 &&
    element.textContent.replace(/ |\n/g, "") !== "";

  const allTexts = matchingWord => {
    const elements = document.body.getElementsByTagName("*");
    for (const element of elements) {
      if (elementHasNoChildrenAndNotEmpty(element)) {
        element.textContent.split(" ").forEach(str => {
          if (isValid(str, matchingWord)) {
            set.add(str);
          }
        });
      }
    }
    console.log(set);
    return Array.from(set);
  };

  return {
    getCurrentWords: (matchingWord = "", n = 5) =>
      allTexts(matchingWord).slice(0, n)
  };
}
