class ToggleSoundComponent extends HTMLElement {
  soundToUse: string;
  soundEnabled = false;

  constructor() {
    super();
    this.soundToUse = this.getAttribute('sound-file') || '/sound/bloop.mp3';

    this.innerHTML = `
      <fieldset>
        <legend>Sound</legend>
        <label for="sound-toggle">Toggle On</label>
        <input type="checkbox" id="sound-toggle">
      </fieldset>
    `;
  }

  connectedCallback() {
    const soundToggle = this.querySelector<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    const label = this.querySelector<HTMLLabelElement>(
      'label[for="sound-toggle"]'
    );

    const soundElementsforClick = document.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
    );

    this.soundEnabled = Boolean(window.localStorage.sound_enabled) || false;

    if (soundToggle) {
      soundToggle.checked = this.soundEnabled;
    }

    soundToggle?.addEventListener('change', () => {
      this.soundEnabled = soundToggle?.checked ? true : false;

      window.localStorage.setItem(
        'sound_enabled',
        this.soundEnabled.toString()
      );

      if (label) {
        this.soundEnabled
          ? (label.textContent = 'Toggle Off')
          : (label.textContent = 'Toggle On');
      }
    });

    soundElementsforClick.forEach((element) => {
      element.addEventListener(
        'click',
        () => {
          if (this.soundEnabled) {
            const audio = new Audio(this.soundToUse);
            audio.play();
          }
        },
        true
      );
    });
  }

  static init() {
    customElements.define('sound-toggle', ToggleSoundComponent);
  }
}

export default ToggleSoundComponent;
