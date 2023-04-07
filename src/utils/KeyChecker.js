export const isCtrlC = (event) =>
  (event.ctrlKey || event.metaKey) && event.code === "KeyC";

export const isSpace = (event) => event.code === "Space";

export const isEscape = (event) => event.code === "Escape";
