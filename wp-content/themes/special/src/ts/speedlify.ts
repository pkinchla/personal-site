export default function initSpeedlify() {
  const el = document.querySelector('speedlify-score');
  if (!el) return;

  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      import('speedlify-score/speedlify-score.js');
      obs.disconnect();
    }
  }, { rootMargin: '200px' });
  observer.observe(el);
}
