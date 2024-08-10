function observeTableOfContents() {
  const link = document.querySelector('.toc-link-js') as HTMLLinkElement;
  const details = document.querySelector('.toc-js') as HTMLDetailsElement;
  const summary = document.querySelector('.toc-js summary') as HTMLElement;

  if (!details) {
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

  summary.addEventListener('click', async (e) => {
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    e.preventDefault();
    document.startViewTransition(() => {
      if (details.open) {
        details.open = false;
      } else {
        details.open = true;
      }
    });
  });

  const observer = new IntersectionObserver(handleIntersection);
  return observer.observe(details);
}

export default observeTableOfContents;
