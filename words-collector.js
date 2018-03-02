function WordsCollector() {
  const foo = (str, matchingWord) =>
    matchingWord ? str.indexOf(matchingWord) !== -1 : true;

  const isValid = (str, matchingWord) => {
    return foo(str, matchingWord) && str.length > 3 && /^[a-zA-Z]+$/.test(str);
  };

  const elementHasNoChildrenAndNotEmpty = element =>
    element.children.length === 0 &&
    element.textContent.replace(/ |\n/g, "") !== "";

  const allTexts = matchingWord => {
    console.log(`>>> ${matchingWord}`);
    const set = new Set();
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
    const list = Array.from(set);
    console.log(`<<< ${list}`);
    return list;
  };

  return {
    getCurrentWords: (matchingWord = "", n = 5) =>
      allTexts(matchingWord).slice(0, n)
  };
}
