const keyActions = KeyActions({
  autoCompletion: () => {
    getAutoCompletionBox().display();
  },
  scape: () => {
    getAutoCompletionBox().hide();
  }
});

window.onkeydown = e => {
  var code = e.keyCode ? e.keyCode : e.which;
  keyActions.read(code);
};

function getAutoCompletionBox() {
  const id = "___auto_completor___";

  const htmlToElement = html => {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  };

  const addStyleTo = element => {
    element.style.position = "absolute";
    element.style.zIndex = 999;
    element.style.background = "red";
  };

  const box = document.getElementById(id);

  const create = (...items) => {
    const element = htmlToElement(
      `<div id="${id}"><ul>` +
        items.reduce((acc, item) => acc + `<li>${item}</li>`, "") +
        "</ul></div>"
    );
    addStyleTo(element);
    return element;
  };

  return {
    display: () => {
      if (box) {
        box.style.display = "";
      } else {
        const div = create("a", "b", "c");
        document.activeElement.parentNode.appendChild(div);
      }
    },
    hide: () => {
      if (box) box.style.display = "none";
    }
  };
}

function KeyActions(
  { autoCompletion, scape } = { autoCompletion: () => {}, scape: () => {} }
) {
  let expectingSpace = false;
  const CTR_KEY = 17;
  const ESC_KEY = 27;
  const SPACE_KEY = 32;

  return {
    read: code => {
      switch (code) {
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
