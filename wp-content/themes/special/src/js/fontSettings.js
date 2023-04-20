import { addEventListenerMulti } from './utils'

function fontSettings() {
  if ('CSS' in window === false || 'supports' in CSS === false) {
    return;
  }

  var defaultWght =
    window.localStorage.font_weight ||
    getComputedStyle(document.documentElement).getPropertyValue(
      '--variable-wght-bold'
    );

  if (window.localStorage.font_weight) {
    document.documentElement.style.setProperty(
      `--variable-wght-bold`,
      window.localStorage.font_weight
    );
  }

  var element = document.createElement('fieldset');
  element.classList.add('font-settings', 'sans-bold-italic');

  var fontSettingsMarkUp = `
    <legend>Font Weight</legend>
    <span>
      <label for="range">Bold Sans-serif</label>
      <input type="range" id="range" name="wght-bold" min="100" max="900" value=${defaultWght}>
      <label for="number" class="assistive-text">Bold Sans-serif</label>
      <span class="number">
        <input aria-describedby="number-error" pattern="[0-9]*" id="number" type="number" min="100" max="900" step="100" maxlength="3" name="wght-bold" value=${defaultWght} />
      </span>
    </span>
  `;

  element.innerHTML = fontSettingsMarkUp;

  document.getElementById('colophon').prepend(element);

  var inputs = document.querySelectorAll('.font-settings input');

  for (const input of inputs) {
    addEventListenerMulti(input, 'change input', function (e) {
      document.documentElement.style.setProperty(
        `--variable-${e.target.name}`,
        e.target.value
      );

      localStorage.setItem(
        'font_weight',
        getComputedStyle(document.documentElement).getPropertyValue(
          '--variable-wght-bold'
        )
      );

      inputs.forEach(
        (e) =>
          (e.value = getComputedStyle(
            document.documentElement
          ).getPropertyValue('--variable-wght-bold'))
      );
    })
  }
}

export default fontSettings;
