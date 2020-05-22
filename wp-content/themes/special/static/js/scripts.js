// import HandleLinks from './HandleLinks'
import TurboLinks from 'turbolinks';
import MobileMenu from './MobileMenu';
import { ready } from './helpers'


(function (document) {
  ready(function() {
    TurboLinks.start()

    const mobileMenu = new MobileMenu();
    mobileMenu.init();

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

    (function() {
      var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
        is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
        is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

      if (( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
        window.addEventListener( 'hashchange', function() {
          var id = location.hash.substring( 1 ),
            element;

          if (!(/^[A-z0-9_-]+$/.test( id ))) {
            return;
          }

          element = document.getElementById(id);

          if ( element ) {
            if (!(/^(?:a|select|input|button|textarea)$/i.test( element.tagName ))) {
              element.tabIndex = -1;
            }
            element.focus();
          }
        }, false);
      }
    })();
  })

}(document));
