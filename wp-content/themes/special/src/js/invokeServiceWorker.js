function invokeServiceWorker() {
  let devEnv = window.location.hostname === 'localhost';

  if ('serviceWorker' in navigator && !devEnv) {
    navigator.serviceWorker.register('/sw.js').then(function () {
      return navigator.serviceWorker.ready;
    });
  }
}

export default invokeServiceWorker;
