function observeHero() {
  var jumpLink = document.querySelector(".jump-link");

  function handleIntersection(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        console.log("add class");
        jumpLink.classList.add("hidden");
      } else {
        console.log("remove class");
        jumpLink.classList.remove("hidden");
      }
    });
  }

  var observer = new IntersectionObserver(handleIntersection);
  return observer.observe(document.querySelector("#home-content"));
}

export default observeHero;
