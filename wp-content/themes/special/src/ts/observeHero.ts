function observeHero() {
  const jumpLink = document.querySelector('.jump-link') as HTMLAnchorElement;
  const linkTarget = document.querySelector('#home-content') as HTMLElement;

  // exit early
  if (!jumpLink) {
    return;
  }

  // prevent flash of links before observer is instantiated
  jumpLink.classList.add('hidden');

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(function (entry: IntersectionObserverEntry) {
      if (entry.isIntersecting) {
        jumpLink.classList.add('hidden');
      } else {
        jumpLink.classList.remove('hidden');
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection);
  return observer.observe(linkTarget);
}

export default observeHero;
