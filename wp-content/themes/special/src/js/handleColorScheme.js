function handleColorScheme() {
  if (window.matchMedia("(prefers-color-scheme)").media === "not all") {
    return;
  }

  var mediaQueryColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

  var handleChange = function (preferenceIsDark) {
    if (preferenceIsDark) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  handleChange(mediaQueryColorScheme.matches);

  mediaQueryColorScheme.addEventListener("change", function (e) {
    var darkModeOn = e.matches;
    handleChange(darkModeOn);
  });
}

export default handleColorScheme;
