export const injectCss = (href) => {
  var css = document.createElement("link");

  css.rel = "stylesheet";
  css.href = href;
  document.head.appendChild(css);
}

export const injectJs = (f) => {
  var script = document.createElement("script");

  script.textContent = f();
  document.body.appendChild(script);
}
