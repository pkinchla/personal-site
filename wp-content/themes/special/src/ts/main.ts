import invokeServiceWorker from './invokeServiceWorker';
import checkJSLoaded from './checkJSLoaded';
import ColorSchemeSwitcher from './colorSchemeSwitcher';
import FontSettingsControl from './fontSettingsControl';
import userSettingsOverlay from './userSettingsOverlay';
import FuzzySearch from './fuzzySearch';
import GitHubContributionGraph from './githubContributionGraph';
import initSpeedlify from './speedlify';

checkJSLoaded();
invokeServiceWorker();
userSettingsOverlay();
initSpeedlify();

ColorSchemeSwitcher.init();
FontSettingsControl.init();
FuzzySearch.init();
GitHubContributionGraph.init();
