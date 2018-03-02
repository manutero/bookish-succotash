function AutoCompletionBox() {
  const wordsCollector = WordsCollector();
  const domElementCreator = DomElementCreator();

  const getBox = () => document.getElementsByClassName(boxClassName)[0];

  /** filled when created the box, pointer to selected current item in the list */
  let index;

  /** filled when created the box, active element of the dom  */
  let input;

  const unMarkItem = (box, i = index.current()) => {
    const element = box.children[0].children[i];
    element && element.classList.remove(markedClassName);
  };

  const markItem = (box, i = index.current()) => {
    const element = box.children[0].children[i];
    element && element.classList.add(markedClassName);
  };

  const removeBox = () => {
    console.log("REMOVING BOX");
    document.getElementsByClassName(boxClassName)[0].innerHTML = "";
  };

  const createBox = () => {
    const currentSentence = document.activeElement.value.split(" ");
    const highlightStr = currentSentence[currentSentence.length - 1];
    console.log(`CREATING BOX [highlightStr: ${highlightStr}]`);
    const items = wordsCollector.getCurrentWords(highlightStr);
    index = IndexPointer(items.length - 1);
    const div = domElementCreator.createDiv(items, highlightStr);
    input = document.activeElement;
    input.parentNode.appendChild(div);
    console.log(`[index: ${index.current()}]`);
    return getBox();
  };

  const isDisplaying = () => {
    const element = document.getElementsByClassName(boxClassName)[0];
    return element && element.innerHTML !== "";
  };

  const display = () => {
    console.log("autoCompletionBox.display()");
    const box = createBox();
    markItem(box);
  };

  const hide = (box = getBox()) => {
    if (box) {
      console.log("autoCompletionBox.hide()");
      removeBox();
    }
  };

  const up = () => {
    const box = getBox();
    if (box) {
      console.log(`autoCompletionBox.up() [index: ${index.current()}]`);
      unMarkItem(box);
      markItem(box, index.prev());
    }
  };

  const down = () => {
    const box = getBox();
    if (box) {
      console.log(`autoCompletionBox.down() [index: ${index.current()}]`);
      unMarkItem(box);
      markItem(box, index.next());
    }
  };

  const letter = () => {
    if (isDisplaying()) {
      console.log("autoCompletionBox.letter()");
      // TODO
    }
    let box = getBox();
  };

  const enter = () => {
    if (!isDisplaying()) {
      return;
    }
    console.log("autoCompletionBox.enter()");
    const box = getBox();
    if (box) {
      const indexLastWord = input.value.lastIndexOf(" ");
      input.value =
        input.value.substring(0, indexLastWord) +
        " " +
        box.children[0].children[index.current()].textContent +
        " ";
      removeBox();
    }
  };

  return {
    isDisplaying,
    display,
    hide,
    up,
    down,
    letter,
    enter
  };
}
