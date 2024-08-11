import observeHero from './observeHero';
import invokeServiceWorker from './invokeServiceWorker';
import checkJSLoaded from './checkJSLoaded';
import observeTableOfContents from './observeTableOfContents';
import ColorSchemeSwitcher from './colorSchemeSwitcher';
import FontSettingsControl from './fontSettingsControl';
import siteSettingsOverlay from './siteSettingsOverlay';
import 'speedlify-score/speedlify-score.js';

function scripts() {
  return (
    checkJSLoaded(),
    observeHero(),
    invokeServiceWorker(),
    ColorSchemeSwitcher.init(),
    FontSettingsControl.init(),
    observeTableOfContents(),
    siteSettingsOverlay()
  );
}

window.addEventListener('DOMContentLoaded', scripts);
