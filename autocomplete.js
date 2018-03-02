const debug = false;

// function foo() {
//   var array = [];

//   const elements = document.body.getElementsByTagName("*");
//   for (const current of elements) {
//     if (
//       current.children.length === 0 &&
//       current.textContent.replace(/ |\n/g, "") !== ""
//     ) {
//       // Check the element has no children && that it is not empty
//       array.push(current.textContent);
//     }
//   }
//   return array;
// }

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
  keyActions.read(e);
};

window.onload = () => {
  stlyeSheet().addStyleToPage();
};
