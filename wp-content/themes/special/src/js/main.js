import fontSettings from "./fontSettings";
import handleColorScheme from "./handleColorScheme";
import observeHero from "./observeHero";
// import invokeServiceWorker from "./invokeServiceWorker";
import "speedlify-score/speedlify-score.js"


function scripts() {
  return fontSettings(), handleColorScheme(), observeHero()
}

window.addEventListener("DOMContentLoaded", scripts);
