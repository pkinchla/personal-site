// import HandleLinks from './HandleLinks'
import TurboLinks from 'turbolinks';
import MobileMenu from './MobileMenu';
import { ready } from './helpers';

(function (document) {
  ready(() => {
    // start service worker
    let dev_env = window.location.hostname === 'localhost';
    // registration for worker for server side caching
    if ('serviceWorker' in navigator && !dev_env) {
      navigator.serviceWorker.register('/sw.js').then(function() {
        return navigator.serviceWorker.ready;
      });
    }

    // init MobileMenu
    new MobileMenu().init();

    (function () {
      if (typeof MutationObserver === 'undefined') {
          return;
      }
      var fixFontDisplay = function () {
          // inject font-display option into typekit fonts
          var styles = document.getElementsByTagName('style');
          for (var i = 0; i < styles.length; i++) {
              if (
                  styles[i].innerText
                  && styles[i].innerText.indexOf('futura-pt') !== -1
                  && styles[i].innerText.indexOf('@font-face{font-display:swap;') === -1
              ) {
                  styles[i].innerText = styles[i].innerText
                          .split('@font-face{').join('@font-face{font-display:swap;');
              }
          }
      };
      var observer = new MutationObserver(function (mutationsList, observer) {
          for (var i = 0; i < mutationsList.length; i++) {
              fixFontDisplay();
          }
      });
      observer.observe(
          document.getElementsByTagName('head')[0],
          {attributes: false, childList: true, subtree: false}
      );
      window.fixFontObserver = observer;
    })();

  });

}(document));
