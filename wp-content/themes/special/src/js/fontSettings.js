function fontSettings() {
  if ("CSS" in window === false || "supports" in CSS === false) {
    return;
  }
  const defaultWght = getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold");

  var handleChange = function (value, setting) {
    document.documentElement.style.setProperty(`--variable-${setting}`, value);
  };

  var element = document.createElement("fieldset");
  element.classList.add("font-settings", 'sans-bold-italic');

  var fontSettingsMarkUp = `
    <legend>Font Weight</legend>
    <span>
      <label for="wght-bold">Bold Sans-serif</label>
      <input type="range" id="wght-bold" name="wght-bold" min="100" max="900" value=${defaultWght}>
      <b>${defaultWght}</b>
    </span>
  `;

  element.innerHTML = fontSettingsMarkUp;

  document.getElementById("colophon").prepend(element);
  var inputs = document.querySelectorAll(".font-settings input");

  for (const input of inputs) {
    input.addEventListener("input", function (e) {
      handleChange(e.target.value, e.target.name);
      // make this reactive
      document.querySelector(".font-settings b").innerText = getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold");
    });

  }
}

export default fontSettings;
