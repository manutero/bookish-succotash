const boxClassName = "___auto_completor___";
const hidenClassName = "___hiden___";
const markedClassName = "___marked___";

function stlyeSheet() {
  const css = `
    .${boxClassName} {
        font-family: monospace;
        font-size: 13px;
        position: absolute;
        z-index: 999;
        background: #FAFAFA;
        box-shadow: 0px 2px 10px #9E9E9E;
        border: 1px solid #BDBDBD;
      }
      .${boxClassName} ul {
          list-style:none;
          margin: 0;
          padding: 0;
      }
      .${boxClassName} li {
          color: #424242;
          padding: 4px 8px;
          transition: all 0.2s ease-out;
      }
      .${boxClassName} li span {
        color: blue;
      }
      .${boxClassName}.${hidenClassName} {
        display: none;
      }
      .${boxClassName} li.${markedClassName} {
          color: #000000;
          background: #BDBDBD;
      }
  `;

  return {
    addStyleToPage: () => {
      var node = document.createElement("style");
      node.type = "text/css";
      node.innerHTML = css;
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  };
}
