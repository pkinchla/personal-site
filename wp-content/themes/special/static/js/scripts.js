// import HandleLinks from './HandleLinks'
import MobileMenu from './MobileMenu';
import { ready } from './helpers';

(function (document) {
  // start service worker
  let dev_env = window.location.hostname === 'localhost';
  // registration for worker for server side caching
  if ('serviceWorker' in navigator && !dev_env) {
    navigator.serviceWorker.register('/sw.js').then(() => {
      return navigator.serviceWorker.ready;
    });
  }

  ready(() => {
    // init MobileMenu
    new MobileMenu().init();
  });

}(document));
