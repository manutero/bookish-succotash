const foo = () => {
  console.log("HEY!");
  const div = elementCreator.getDiv("a", "b", "c");
  document.activeElement.parentNode.appendChild(div);
};

const autoCompletionDetector = AutoCompletionDetector(foo);
const elementCreator = ElementCreator();

window.onkeydown = e => {
  var code = e.keyCode ? e.keyCode : e.which;
  autoCompletionDetector.read(code);
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
        "<div><ul>" +
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

function AutoCompletionDetector(cb) {
  let expectingSpace = false;
  const CTR_KEY = 17;
  const SPACE_KEY = 32;

  return {
    read: code => {
      if (code === CTR_KEY) {
        expectingSpace = true;
      } else if (code === SPACE_KEY) {
        if (expectingSpace) {
          expectingSpace = false;
          cb();
        }
      } else {
        expectingSpace = false;
      }
    }
  };
}
