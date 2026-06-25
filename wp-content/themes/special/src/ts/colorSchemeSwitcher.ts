const LS_KEY = 'color-scheme';

export default class ColorSchemeSwitcher extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    const stored = localStorage.getItem(LS_KEY) || 'system';

    this.innerHTML = `
      <fieldset class="color-theme-switcher sans-medium-italic">
        <legend>Color Scheme</legend>
        <label for="scheme-system">
          <input type="radio" id="scheme-system" name="color-scheme" value="system"${stored === 'system' ? ' checked' : ''}>
          System
        </label>
        <label for="scheme-light">
          <input type="radio" id="scheme-light" name="color-scheme" value="light"${stored === 'light' ? ' checked' : ''}>
          Light
        </label>
        <label for="scheme-dark">
          <input type="radio" id="scheme-dark" name="color-scheme" value="dark"${stored === 'dark' ? ' checked' : ''}>
          Dark
        </label>
      </fieldset>
    `;

    for (const input of this.querySelectorAll<HTMLInputElement>('input')) {
      input.addEventListener('click', (e) => {
        const target = e.target as HTMLInputElement;
        ColorSchemeSwitcher.applyScheme(target.value, true);
      });
    }
  }

  static applyScheme(scheme: string, persist = false) {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="color-scheme"]'
    );

    if (scheme === 'dark') {
      document.documentElement.style.colorScheme = 'dark';
      if (meta) meta.content = 'dark';
    } else if (scheme === 'light') {
      document.documentElement.style.colorScheme = 'light';
      if (meta) meta.content = 'light';
    } else {
      document.documentElement.style.colorScheme = '';
      if (meta) meta.content = 'light dark';
    }

    if (persist) {
      if (scheme === 'system') {
        localStorage.removeItem(LS_KEY);
      } else {
        localStorage.setItem(LS_KEY, scheme);
      }
    }
  }

  static init() {
    if (window.matchMedia('(prefers-color-scheme)').media === 'not all') return;

    const stored = localStorage.getItem(LS_KEY);
    if (stored) ColorSchemeSwitcher.applyScheme(stored);

    customElements.define('color-theme-switcher', ColorSchemeSwitcher);
  }
}
