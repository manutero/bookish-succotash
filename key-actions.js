function KeyActions({ autoCompletion, up, down, enter, scape }) {
  let expectingSpace = false;
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
    read: e => {
      const code = e.keyCode ? e.keyCode : e.which;
      if (Object.values(keys).indexOf(code) < 0) {
        return;
      }
      e.preventDefault();
      switch (code) {
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
