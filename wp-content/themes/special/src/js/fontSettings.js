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
        <input aria-describedby="number-error" pattern="[0-9]+" id="number" pattern="" type="text" min="100" max="900" maxlength="3" name="wght-bold" value=${defaultWght} />
        <span id="number-error" class="field-error" aria-live="assertive"></span>
      </span>
    </span>
  `;

  element.innerHTML = fontSettingsMarkUp;

  document.getElementById('colophon').prepend(element);
  var inputs = document.querySelectorAll('.font-settings input');

  function validateInput(input) {
    const isValid = input.validity.valid;
    const isTextInput = input.type === 'text';
    const fieldError = document.getElementById('number-error');

    if (isValid && isTextInput) {
      fieldError.innerText = '';
      input.removeAttribute('aria-invalid', 'false');
    } else {
      fieldError.innerText = 'Please enter a number';
      input.setAttribute('aria-invalid', 'true');
    }
  }

  for (const input of inputs) {
    // validate on load
    validateInput(input);

    input.addEventListener('input', function (e) {
      // validate on input
      validateInput(e.target);

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
    });
  }
}

export default fontSettings;
