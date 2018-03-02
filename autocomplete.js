const debug = false;

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
  },
  letter: () => {
    autoCompletionBox.letter();
  }
});

window.onkeydown = e => {
  keyActions.read(e, { mustPreventDefault: autoCompletionBox.isDisplaying() });
};

window.onload = () => {
  stlyeSheet().addStyleToPage();
};
