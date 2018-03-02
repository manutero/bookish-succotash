function AutoCompletionBox() {
  const htmlToElement = html => {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  };

  const wordsCollector = WordsCollector();

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

  const goo = (str, highlightStr) => {
    if (!highlightStr) return str;
    const indexOfHighlight = str.indexOf(highlightStr);
    return (
      str.substring(0, indexOfHighlight) +
      `<span>${highlightStr}</span>` +
      str.substring(indexOfHighlight + highlightStr.length)
    );
  };

  const removeBox = () => {
    console.log("REMOVING BOX");
    document.getElementsByClassName(boxClassName)[0].innerHTML = "";
  };

  const createBox = () => {
    const currentSentence = document.activeElement.value.split(" ");
    const highlightStr = currentSentence[currentSentence.length - 1];
    console.log(`CREATING BOX [currentLastWord: ${highlightStr}]`);
    const items = wordsCollector.getCurrentWords(highlightStr);
    index = IndexPointer(items.length - 1);
    const div = htmlToElement(
      `<div class="${boxClassName}"><ul>` +
        items.reduce(
          (acc, item) => acc + `<li>${goo(item, highlightStr)}</li>`,
          ""
        ) +
        "</ul></div>"
    );
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
