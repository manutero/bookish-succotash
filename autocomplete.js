const id = "___auto_completor___";

const getAutoCompletionBox = () => {
  const box = document.getElementById(id);
  return {
    create: () => {
      if (box) {
        box.style.display = "";
      } else {
        const div = elementCreator.getDiv("a", "b", "c");
        document.activeElement.parentNode.appendChild(div);
      }
    },
    hide: () => {
      if (box) box.style.display = "none";
    }
  };
};

const keyActions = KeyActions({
  autoCompletion: () => {
    getAutoCompletionBox().create();
  },
  scape: () => {
    getAutoCompletionBox().hide();
  }
});
const elementCreator = ElementCreator();

window.onkeydown = e => {
  var code = e.keyCode ? e.keyCode : e.which;
  keyActions.read(code);
};

function ElementCreator() {
  const htmlToElement = html => {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  };
  return {
    getDiv: (...items) => {
      console.log(items);
      const element = htmlToElement(
        `<div id="${id}"><ul>` +
          items.reduce((acc, item) => acc + `<li>${item}</li>`, "") +
          "</ul></div>"
      );
      element.style.position = "absolute";
      element.style.zIndex = 999;
      element.style.background = "red";
      return element;
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
      if (code == ESC_KEY) {
        expectingSpace = false;
        scape();
      }
      if (code === CTR_KEY) {
        expectingSpace = true;
      } else if (code === SPACE_KEY) {
        if (expectingSpace) {
          expectingSpace = false;
          autoCompletion();
        }
      } else {
        expectingSpace = false;
      }
    }
  };
}
