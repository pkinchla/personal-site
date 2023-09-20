function observeTOC() {
  const link = document.querySelector('.toc-link-js') as HTMLLinkElement;
  const toc = document.querySelector('.toc-js') as HTMLDetailsElement;

  if (!toc) {
    return;
  }

  const handleIntersection = function (entries: IntersectionObserverEntry[]) {
    entries.forEach(function (entry: IntersectionObserverEntry) {
      if (entry.isIntersecting) {
        link.classList.add('hidden');
      } else {
        link.classList.remove('hidden');
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection);
  return observer.observe(toc);
}

export default observeTOC;
