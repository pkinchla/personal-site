// import HandleLinks from './HandleLinks'
import TurboLinks from 'turbolinks';
import MobileMenu from './MobileMenu';
import { ready } from './helpers';
import clientRouting from './clientRouting';
import initPrism from './prism';

(function (document) {
  ready(() => {
    // init client side routing
    clientRouting();

    // init MobileMenu
    new MobileMenu().init();

    // init prism
    initPrism();

    // start service worker
    let dev_env = window.location.hostname === 'localhost';
    // registration for worker for server side caching
    if ('serviceWorker' in navigator && !dev_env) {
      navigator.serviceWorker.register('/sw.js').then(function() {
        return navigator.serviceWorker.ready;
      });
    }

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

  document.addEventListener("turbolinks:load", function(e) {
    let initialLoad = Object.getOwnPropertyNames(e.data.timing).length === 0;

    if(Prism) {
      Prism.highlightAll()
    }

    let focusPageEl = document.querySelector('h1');
    if(focusPageEl && !initialLoad) {
      focusPageEl.focus()
    }

    let formEl = document.querySelector('#searchform')
    if(formEl) {
      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = `/?s=${e.target.elements[0].value.toLocaleLowerCase()}&submit=Search`;
        TurboLinks.visit(query);
      });
    }

  });

}(document));
