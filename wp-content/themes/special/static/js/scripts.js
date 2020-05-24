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
