function AutoCompletionBox() {
  const wordsCollector = WordsCollector();
  const domElementCreator = DomElementCreator();

  const getBox = () => document.getElementsByClassName(boxClassName)[0];

  let showingBox = false;
  let index;
  let input;

  const unMarkItem = (box, i = index.current()) => {
    box.children[0].children[i].classList.remove(markedClassName);
  };

  const markItem = (box, i = index.current()) => {
    box.children[0].children[i].classList.add(markedClassName);
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
    return getBox();
  };

  const isDisplaying = () => {
    return showingBox;
  };

  const display = () => {
    console.log("autoCompletionBox.display()");
    let box = getBox();
    if (box) {
      box.classList.remove(hidenClassName);
    } else {
      box = createBox();
    }
    showingBox = true;
    markItem(box);
  };

  const hide = (box = getBox()) => {
    console.log("autoCompletionBox.hide()");
    showingBox = false;
    if (box) box.classList.add(hidenClassName);
  };

  const up = () => {
    console.log("autoCompletionBox.up()");
    const box = getBox();
    if (box) {
      unMarkItem(box);
      markItem(box, index.prev());
    }
  };

  const down = () => {
    console.log("autoCompletionBox.down()");
    const box = getBox();
    if (box) {
      unMarkItem(box);
      markItem(box, index.next());
    }
  };

  const letter = () => {
    console.log("autoCompletionBox.letter()");
    let box = getBox();
    if (box) {
      // TODO
    }
  };

  const enter = () => {
    console.log("autoCompletionBox.enter()");
    if (!showingBox) {
      return;
    }
    const box = getBox();
    if (box) {
      const indexLastWord = input.value.lastIndexOf(" ");
      input.value =
        input.value.substring(0, indexLastWord) +
        " " +
        box.children[0].children[index.current()].textContent +
        " ";
      box.classList.add(hidenClassName);
      showingBox = false;
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
