function observeHero() {
  var jumpLink = document.querySelector(".jump-link");
  if (!jumpLink) return;

  function handleIntersection(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        jumpLink.classList.add("hidden");
      } else {
        jumpLink.classList.remove("hidden");
      }
    });
  }

  var observer = new IntersectionObserver(handleIntersection);
  return observer.observe(document.querySelector("#home-content"));
}

export default observeHero;
