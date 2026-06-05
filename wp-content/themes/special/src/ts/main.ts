import observeHero from './observeHero';
import invokeServiceWorker from './invokeServiceWorker';
import checkJSLoaded from './checkJSLoaded';
import ColorSchemeSwitcher from './colorSchemeSwitcher';
import FontSettingsControl from './fontSettingsControl';
import siteSettingsOverlay from './siteSettingsOverlay';
import FuzzySearch from './fuzzySearch';
import GitHubContributionGraph from './githubContributionGraph';
import setScrollbarWidth from './setScrollbarWidth';

import('speedlify-score/speedlify-score.js');

checkJSLoaded();
setScrollbarWidth();
invokeServiceWorker();
siteSettingsOverlay();
observeHero();
ColorSchemeSwitcher.init();
FontSettingsControl.init();
FuzzySearch.init();
GitHubContributionGraph.init();
