import fontSettings from "./fontSettings";
import handleColorScheme from "./handleColorScheme";
import observeHero from "./observeHero";
import invokeServiceWorker from "./invokeServiceWorker";

function scripts() {
  return handleColorScheme(), observeHero(), invokeServiceWorker(), fontSettings()
}

window.addEventListener("DOMContentLoaded", scripts);
