import observeHero from './observeHero';
import invokeServiceWorker from './invokeServiceWorker';
import checkJSLoaded from './checkJSLoaded';
import ColorSchemeSwitcher from './colorSchemeSwitcher';
import FontSettingsControl from './fontSettingsControl';
import siteSettingsOverlay from './siteSettingsOverlay';
import FuzzySearch from './fuzzySearch';
import GitHubContributionGraph from './githubContributionGraph';
import setScrollbarWidth from './setScrollbarWidth';
import initSpeedlify from './speedlify';

checkJSLoaded();
setScrollbarWidth();
invokeServiceWorker();
siteSettingsOverlay();
observeHero();
initSpeedlify();

ColorSchemeSwitcher.init();
FontSettingsControl.init();
FuzzySearch.init();
GitHubContributionGraph.init();

//shame
if (!('HTMLInstallElement' in window)) {
  document.querySelector('install')?.remove();
}
