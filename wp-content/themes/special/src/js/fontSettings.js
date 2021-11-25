function fontSettings() {
  const defaultWght = getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold");
  const defaultSlant = getComputedStyle(document.documentElement).getPropertyValue("--variable-slant");

  var handleChange = function (value, setting) {
    document.documentElement.style.setProperty(`--variable-${setting}`, value);
  };

  var element = document.createElement("fieldset");
  element.classList.add("font-settings", 'sans-bold-italic');
  console.log('hello')

  var fontSettingsMarkUp = `
    <legend>Font Settings</legend>
    <span>
      <input type="range" id="wght-bold" name="wght-bold" min="100" max="900" value=${defaultWght}>
      <label for="wght-bold">Weight</label>
    </span>
    <span>
      <input type="range" id="slant" name="slant" min="-10" max="0" value=${defaultSlant}>
      <label for="slant">Slant</label>
    </span>
  `;

  element.innerHTML = fontSettingsMarkUp;

  document.getElementById("colophon").prepend(element);
  var inputs = document.querySelectorAll(`.font-settings input`);

  for (const input of inputs) {
    input.addEventListener("input", function (e) {
      handleChange(e.target.value, e.target.name);
    });

  }
}

export default fontSettings;
