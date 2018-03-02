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

  const create = (items = []) => {
    index = Index(items.length - 1);
    const element = htmlToElement(
      `<div class="${boxClassName}"><ul>` +
        items.reduce((acc, item) => acc + `<li>${item}</li>`, "") +
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

  const createBox = () => {
    const div = create(wordsCollector.getCurrentWords());
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
    enter: () => {
      console.log("autoCompletionBox.enter()");
      if (!showingBox) {
        return;
        // simulate real enter
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
