function KeyActions({ autoCompletion, up, down, enter, scape, letter }) {
  let expectingSpace = false;
  const isLetter = keyCode => {
    return (
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 65 && keyCode <= 90) ||
      (keyCode >= 97 && keyCode <= 122)
    );
  };
  const keys = {
    CTR_KEY: 17,
    ESC_KEY: 27,
    SPACE_KEY: 32,
    LEFT_KEY: 37,
    UP_KEY: 38,
    RIGHT_KEY: 39,
    DOWN_KEY: 40,
    ENTER_KEY: 13
  };
  return {
    read: (event, { mustPreventDefault }) => {
      const keyCode = event.keyCode ? event.keyCode : event.which;
      const isAlphaNumeric = isLetter(keyCode);

      if (Object.values(keys).indexOf(keyCode) < 0 && !isAlphaNumeric) {
        return;
      }

      if (mustPreventDefault) {
        event.preventDefault();
      }

      if (isAlphaNumeric) {
        return letter();
      }

      switch (keyCode) {
        case keys.UP_KEY:
          expectingSpace = false;
          up();
          break;
        case keys.DOWN_KEY:
          expectingSpace = false;
          down();
          break;
        case keys.ENTER_KEY:
          expectingSpace = false;
          enter();
          break;
        case keys.ESC_KEY:
          expectingSpace = false;
          scape();
          break;
        case keys.CTR_KEY:
          expectingSpace = true;
          break;
        case keys.SPACE_KEY:
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
