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

  const Index = max => {
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
  };

  let index;
  let input;

  let selectedItem = -1;
  const anyItemSelected = () => {
    return (
      selectedItem >= 0 && selectedItem < getBox().children[0].children.length
    );
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

  const create = (items = [], highlightStr = "") => {
    index = Index(items.length - 1);
    const element = htmlToElement(
      `<div class="${boxClassName}"><ul>` +
        items.reduce(
          (acc, item) => acc + `<li>${goo(item, highlightStr)}</li>`,
          ""
        ) +
        "</ul></div>"
    );
    return element;
  };

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
    const currentLastWord = currentSentence[currentSentence.length - 1];
    console.log(`CREATING BOX [currentLastWord: ${currentLastWord}]`);
    const div = create(
      wordsCollector.getCurrentWords(currentLastWord),
      currentLastWord
    );
    input = document.activeElement;
    input.parentNode.appendChild(div);
    return getBox();
  };

  return {
    isDisplaying: () => {
      return showingBox;
    },
    display: () => {
      console.log("autoCompletionBox.display()");
      let box = getBox();
      if (box) {
        box.classList.remove(hidenClassName);
      } else {
        box = createBox();
      }
      showingBox = true;
      markItem(box);
    },
    hide: (box = getBox()) => {
      console.log("autoCompletionBox.hide()");
      showingBox = false;
      if (box) box.classList.add(hidenClassName);
    },
    up: () => {
      console.log("autoCompletionBox.up()");
      const box = getBox();
      if (box) {
        unMarkItem(box);
        markItem(box, index.prev());
      }
    },
    down: () => {
      console.log("autoCompletionBox.down()");
      const box = getBox();
      if (box) {
        unMarkItem(box);
        markItem(box, index.next());
      }
    },
    letter: () => {
      console.log("autoCompletionBox.letter()");
      let box = getBox();
      if (box) {
        // TODO
      }
    },
    enter: () => {
      console.log("autoCompletionBox.enter()");
      if (!showingBox) {
        return;
      }
      const box = getBox();
      if (box) {
        input.value =
          input.value +
          box.children[0].children[index.current()].textContent +
          " ";
        box.classList.add(hidenClassName);
        showingBox = false;
      }
    }
  };
}
