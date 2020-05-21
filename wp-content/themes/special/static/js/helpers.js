export function ready(fn) {
  if (typeof fn !== 'function') {
    return;
  }

  if(document.readyState === 'complete') {
    return fn();
  }

  document.addEventListener('DOMContentLoaded', fn, false);
};