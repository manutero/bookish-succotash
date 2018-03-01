const foo = () => {
  console.log("HEY!");
};

const autoCompletionDetector = AutoCompletionDetector(foo);

window.onkeydown = e => {
  var code = e.keyCode ? e.keyCode : e.which;
  autoCompletionDetector.read(code);
};

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
