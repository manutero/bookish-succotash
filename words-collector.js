function WordsCollector() {
  const words = new Set();

  const allTexts = () => {
    const array = [];
    const elements = document.body.getElementsByTagName("*");
    for (const current of elements) {
      // Check the element has no children && that it is not empty
      if (
        current.children.length === 0 &&
        current.textContent.replace(/ |\n/g, "") !== ""
      ) {
        const words = current.textContent.split(" ");
        console.log(words);
        // array.push(current.textContent);
      }
    }
    return [
      "createListElements",
      "fooExtraLarge",
      "interactorExtractorFactory",
      "myElement"
    ];
  };

  return {
    getCurrentWords: (max = 10) => allTexts()
  };
}
