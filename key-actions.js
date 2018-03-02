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
