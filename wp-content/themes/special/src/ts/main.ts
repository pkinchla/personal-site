import fontSettings from './fontSettings';
import handleColorScheme from './handleColorScheme';
import observeHero from './observeHero';
import invokeServiceWorker from './invokeServiceWorker';
import checkJSLoaded from './checkJSLoaded';
import 'speedlify-score/speedlify-score.js';

function scripts() {
  return (
    checkJSLoaded(),
    fontSettings(),
    handleColorScheme(),
    observeHero(),
    invokeServiceWorker()
  );
}

window.addEventListener('DOMContentLoaded', scripts);
