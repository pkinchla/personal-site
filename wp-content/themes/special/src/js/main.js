import handleColorScheme from "./handleColorScheme";
import observeHero from "./observeHero";

function scripts() {
  return handleColorScheme(), observeHero();
}

window.addEventListener("load", scripts);
