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
    invokeServiceWorker(),
    siteSettingsOverlay(),
    observeHero(),
    ColorSchemeSwitcher.init(),
    FontSettingsControl.init(),
    observeTableOfContents()
  );
}

window.addEventListener('DOMContentLoaded', scripts);
