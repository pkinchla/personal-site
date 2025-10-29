import observeHero from './observeHero';
import invokeServiceWorker from './invokeServiceWorker';
import checkJSLoaded from './checkJSLoaded';
import observeTableOfContents from './observeTableOfContents';
import ColorSchemeSwitcher from './colorSchemeSwitcher';
import FontSettingsControl from './fontSettingsControl';
import siteSettingsOverlay from './siteSettingsOverlay';
import FuzzySearch from './fuzzySearch';
import 'speedlify-score/speedlify-score.js';

function scripts() {
  return (
    checkJSLoaded(),
    invokeServiceWorker(),
    siteSettingsOverlay(
      'button[popovertarget=site-settings]',
      '#site-settings'
    ),
    observeHero(),
    ColorSchemeSwitcher.init(),
    FontSettingsControl.init(),
    FuzzySearch.init(),
    observeTableOfContents()
  );
}

window.addEventListener('DOMContentLoaded', scripts);
