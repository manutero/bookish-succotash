function DomElementCreator() {
  const htmlToElement = html => {
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  };

  const goo = (str, highlightStr) => {
    if (!highlightStr) return str;
    const indexOfHighlight = str.indexOf(highlightStr);
    return (
      str.substring(0, indexOfHighlight) +
      `<span>${highlightStr}</span>` +
      str.substring(indexOfHighlight + highlightStr.length)
    );
  };

  return {
    createDiv: (items, highlightStr) =>
      htmlToElement(
        `<div class="${boxClassName}"><ul>` +
          items.reduce(
            (acc, item) => acc + `<li>${goo(item, highlightStr)}</li>`,
            ""
          ) +
          "</ul></div>"
      )
  };
}
