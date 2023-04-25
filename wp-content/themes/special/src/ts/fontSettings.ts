import { addEventListenerMulti } from './utils';

function fontSettings() {
  if ('CSS' in window === false || 'supports' in CSS === false) {
    return;
  }

  const defaultWght =
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

  const element = document.createElement('fieldset') as HTMLFieldSetElement;
  element.classList.add('font-settings', 'sans-bold-italic');

  const fontSettingsMarkUp = `
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

  const footer = document.getElementById('colophon') as HTMLElement;
  footer.prepend(element);

  const inputs = document.querySelectorAll(
    '.font-settings input'
  ) as unknown as HTMLInputElement[];

  for (const input of inputs) {
    addEventListenerMulti(input, 'change input', function (e) {
      const target = e.target as HTMLInputElement;
      document.documentElement.style.setProperty(
        `--variable-${target.name}`,
        target.value
      );

      localStorage.setItem(
        'font_weight',
        getComputedStyle(document.documentElement).getPropertyValue(
          '--variable-wght-bold'
        )
      );

      inputs.forEach(
        (input) =>
          (input.value = getComputedStyle(
            document.documentElement
          ).getPropertyValue('--variable-wght-bold'))
      );
    });
  }
}

export default fontSettings;
