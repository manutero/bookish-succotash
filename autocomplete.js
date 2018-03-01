const CTR_KEY = 17;
const SPACE_KEY = 32;

const foo = () => {
  console.log("HEY!");
};

let expectingSpace = false;
const keyPressed = code => {
  if (code === CTR_KEY) {
    expectingSpace = true;
  } else if (code === SPACE_KEY) {
    if (expectingSpace) {
      expectingSpace = false;
      foo();
    }
  } else {
    expectingSpace = false;
  }
};

window.onkeydown = e => {
  var code = e.keyCode ? e.keyCode : e.which;
  keyPressed(code);
};
