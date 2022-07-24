function fontSettings() {
  if ("CSS" in window === false || "supports" in CSS === false) {
    return;
  }

  var defaultWght = window.localStorage.font_weight || getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold");

  if (window.localStorage.font_weight) {
    document.documentElement.style.setProperty(`--variable-wght-bold`, window.localStorage.font_weight);
  }

  var element = document.createElement("fieldset");
  element.classList.add("font-settings", 'sans-bold-italic');

  var fontSettingsMarkUp = `
    <legend>Font Weight</legend>
    <span>
      <label for="range">Bold Sans-serif</label>
      <input type="range" id="range" name="wght-bold" min="100" max="900" value=${defaultWght}>
      <label for="number" class="assistive-text">Bold Sans-serif</label>
      <input id="number" type="number" min="100" max="900" name="wght-bold" step="100" value=${defaultWght} />
    </span>
  `;

  element.innerHTML = fontSettingsMarkUp;

  document.getElementById("colophon").prepend(element);
  var inputs = document.querySelectorAll(".font-settings input");

  for (const input of inputs) {
    input.addEventListener("input", function (e) {
      document.documentElement.style.setProperty(`--variable-${e.target.name}`, e.target.value);
      localStorage.setItem("font_weight", getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold"));
      inputs.forEach(e => e.value = getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold"))
    });
  }




}

export default fontSettings;
