const boxClassName = "___auto_completor___";
const hidenClassName = "___hiden___";
const markedClassName = "___marked___";

window.onload = () => {
  addStyleToPage(`
    .${boxClassName} {
      position: absolute;
      z-index: 999;
      background: red;
    }
    .${hidenClassName} {
      display: none;
    }
    .${markedClassName} {
        background: blue;
    }
`);
};

const autoCompletionBox = AutoCompletionBox();

const keyActions = KeyActions({
  autoCompletion: () => {
    autoCompletionBox.display();
  },
  scape: () => {
    autoCompletionBox.hide();
  },
  up: () => {
    autoCompletionBox.up();
  },
  down: () => {
    autoCompletionBox.down();
  },
  enter: () => {
    autoCompletionBox.enter();
  }
});

window.onkeydown = e => {
  var code = e.keyCode ? e.keyCode : e.which;
  keyActions.read(code);
};

function Index(max) {
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
}

function AutoCompletionBox() {
  const htmlToElement = html => {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  };

  const getBox = () => document.getElementsByClassName(boxClassName)[0];

  let selectedItem = -1;
  const anyItemSelected = () => {
    return (
      selectedItem >= 0 && selectedItem < getBox().children[0].children.length
    );
  };

  const create = (...items) => {
    const element = htmlToElement(
      `<div class="${boxClassName}"><ul>` +
        items.reduce((acc, item) => acc + `<li>${item}</li>`, "") +
        "</ul></div>"
    );

    return element;
  };

  const unMarkItem = () => {
    if (anyItemSelected()) {
      getBox().children[0].children[selectedItem].classList.remove(
        markedClassName
      );
    }
  };

  const markItem = () => {
    if (anyItemSelected()) {
      getBox().children[0].children[selectedItem].classList.add(
        markedClassName
      );
    }
  };

  return {
    display: () => {
      const box = getBox();
      if (box) {
        getBox().classList.remove(hidenClassName);
      } else {
        const div = create("a", "b", "c");
        document.activeElement.parentNode.appendChild(div);
      }
    },
    hide: () => {
      const box = getBox();
      if (box) getBox().classList.add(hidenClassName);
    },
    up: () => {
      const box = getBox();
      if (box) {
        if (selectedItem !== -1) {
          unMarkItem();
          selectedItem--;
          markItem();
        }
      }
    },
    down: () => {
      const box = getBox();
      if (box) {
        if (selectedItem !== box.children[0].children.length) {
          unMarkItem();
          selectedItem++;
          markItem();
        }
      }
    }
  };
}

function KeyActions({ autoCompletion, up, down, enter, scape }) {
  let expectingSpace = false;
  const CTR_KEY = 17;
  const ESC_KEY = 27;
  const SPACE_KEY = 32;
  const LEFT_KEY = 37;
  const UP_KEY = 38;
  const RIGHT_KEY = 39;
  const DOWN_KEY = 40;
  const ENTER_KEY = 13;
  return {
    read: code => {
      switch (code) {
        case UP_KEY:
          expectingSpace = false;
          up();
          break;
        case DOWN_KEY:
          expectingSpace = false;
          down();
          break;
        case ENTER_KEY:
          expectingSpace = false;
          enter();
          break;
        case ESC_KEY:
          expectingSpace = false;
          scape();
          break;
        case CTR_KEY:
          expectingSpace = true;
          break;
        case SPACE_KEY:
          if (expectingSpace) {
            expectingSpace = false;
            autoCompletion();
            break;
          }
        default:
          expectingSpace = false;
      }
    }
  };
}

function addStyleToPage(css) {
  var node = document.createElement("style");
  node.type = "text/css";
  node.innerHTML = css;
  document.getElementsByTagName("head")[0].appendChild(node);
}
