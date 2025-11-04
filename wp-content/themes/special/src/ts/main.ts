import observeHero from './observeHero';
import invokeServiceWorker from './invokeServiceWorker';
import checkJSLoaded from './checkJSLoaded';
import ColorSchemeSwitcher from './colorSchemeSwitcher';
import FontSettingsControl from './fontSettingsControl';
import siteSettingsOverlay from './siteSettingsOverlay';
import FuzzySearch from './fuzzySearch';
import 'speedlify-score/speedlify-score.js';
import setScrollbarWidth from './setScrollbarWidth';

function scripts() {
  return (
    checkJSLoaded(),
    setScrollbarWidth(),
    invokeServiceWorker(),
    siteSettingsOverlay(),
    observeHero(),
    ColorSchemeSwitcher.init(),
    FontSettingsControl.init(),
    FuzzySearch.init()
  );
}

window.addEventListener('DOMContentLoaded', scripts);
