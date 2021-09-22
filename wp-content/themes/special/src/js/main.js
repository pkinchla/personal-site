import handleColorScheme from "./handleColorScheme";
import observeHero from "./observeHero";
import invokeServiceWorker from "./invokeServiceWorker";

function scripts() {
  return handleColorScheme(), observeHero(), invokeServiceWorker();
}

window.addEventListener("DOMContentLoaded", scripts);
