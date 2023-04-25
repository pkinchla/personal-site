function checkJSLoaded() {
  const htmlEl = document.querySelector('html') as HTMLHtmlElement;
  htmlEl.classList.remove('no-js');
}

export default checkJSLoaded;
