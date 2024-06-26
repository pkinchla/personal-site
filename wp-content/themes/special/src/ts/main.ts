import observeHero from './observeHero';
import invokeServiceWorker from './invokeServiceWorker';
import checkJSLoaded from './checkJSLoaded';
import observeTOC from './observeTOC';
import ColorSchemeSwitcher from './colorSchemeSwitcher';
import FontSettingsControl from './fontSettingsControl';
import 'speedlify-score/speedlify-score.js';

function scripts() {
  return (
    checkJSLoaded(),
    observeHero(),
    invokeServiceWorker(),
    ColorSchemeSwitcher.init(),
    FontSettingsControl.init(),
    observeTOC()
  );
}

window.addEventListener('DOMContentLoaded', scripts);
