import MobileMenu from './MobileMenu';
import PostsList from './PostsList';

(function (document) {
  MobileMenu(
    document.querySelector('.js-main-navigation'),
    document.querySelector('.js-main-navigation-items')
  );
  PostsList(document.querySelector('.js-posts'));

  let dev_env = window.location.hostname === 'localhost';
  // registration for worker for server side caching
  if ('serviceWorker' in navigator && !dev_env) {
    navigator.serviceWorker.register('/sw.js').then(() => {
      return navigator.serviceWorker.ready;
    });
  }
})(document);
