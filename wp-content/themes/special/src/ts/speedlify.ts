export default function initSpeedlify() {
  const el = document.querySelector('speedlify2-score');
  if (!el) return;

  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      import('./vendor/speedlify2-score.js');
      obs.disconnect();
    }
  }, { rootMargin: '200px' });
  observer.observe(el);
}
