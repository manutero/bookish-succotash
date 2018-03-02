function AutoCompletionBox() {
  const htmlToElement = html => {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  };

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

  function simulateEnter() {
    var keyboardEvent = document.createEvent("KeyboardEvent");
    var initMethod =
      typeof keyboardEvent.initKeyboardEvent !== "undefined"
        ? "initKeyboardEvent"
        : "initKeyEvent";

    keyboardEvent[initMethod](
      "keydown", // event type : keydown, keyup, keypress
      true, // bubbles
      true, // cancelable
      window, // viewArg: should be window
      false, // ctrlKeyArg
      false, // altKeyArg
      false, // shiftKeyArg
      false, // metaKeyArg
      40, // keyCodeArg : unsigned long the virtual key code, else 0
      0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
  }

  const create = (...items) => {
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
    const div = create(
      "createListElements",
      "fooExtraLarge",
      "interactorExtractorFactory",
      "myElement"
    );
    input = document.activeElement;
    input.parentNode.appendChild(div);
    return getBox();
  };

  return {
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
