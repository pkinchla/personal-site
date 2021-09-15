function handleColorScheme() {
  if (window.matchMedia("(prefers-color-scheme)").media === "not all") {
    return;
  }

  if (!window.localStorage.color_scheme === "system") {
    localStorage.setItem("color_scheme", "system");
  }

  var mediaQueryColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

  var matchesDark = function (matchBool) {
    return matchBool ? "dark" : "light";
  };

  var handleChange = function (scheme, userToggle = false) {
    var htmlEl = document.querySelector("html");
    switch (scheme) {
      case "dark":
        htmlEl.classList.add("dark-mode");
        if (userToggle) {
          localStorage.setItem("color_scheme", "dark");
        }
        break;
      case "light":
        htmlEl.classList.remove("dark-mode");
        if (userToggle) {
          localStorage.setItem("color_scheme", "light");
        }
        break;
      default:
        handleChange(matchesDark(mediaQueryColorScheme.matches));
        if (userToggle) {
          localStorage.setItem("color_scheme", "system");
        }
    }
  };

  handleChange(window.localStorage.color_scheme);

  mediaQueryColorScheme.addEventListener("change", function (e) {
    if (
      window.localStorage.color_scheme === "dark" ||
      window.localStorage.color_scheme === "light"
    )
      return;
    handleChange(matchesDark(e.matches));
  });

  var element = document.createElement("fieldset");
  element.classList.add("color-theme-switcher");

  var darkToggleMarkUp = `
    <legend>Color Scheme</legend>
    <input type="radio" id="system" name="color-scheme" value="system">
    <label for="system">System</label>
    <input type="radio" id="dark" name="color-scheme" value="dark">
    <label for="dark">Dark</label>
    <input type="radio" id="light" name="color-scheme" value="light">
    <label for="light">Light</label>
  `;

  element.innerHTML = darkToggleMarkUp;

  document.getElementById("colophon").prepend(element);

  var inputs = document.querySelectorAll(`.color-theme-switcher input`);
  for (const input of inputs) {
    if (input.value === window.localStorage.color_scheme) input.checked = true;
    input.addEventListener("change", function (e) {
      handleChange(e.target.value, true);
    });
  }
}

export default handleColorScheme;
