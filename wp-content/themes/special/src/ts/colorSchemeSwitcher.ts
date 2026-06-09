import { getCookie } from './utils';

const mqlDark = window.matchMedia('(prefers-color-scheme: dark)');

export default class ColorSchemeSwitcher extends HTMLElement {
  mediaQueryColorScheme: MediaQueryList;

  constructor() {
    super();

    this.mediaQueryColorScheme = mqlDark;
  }

  connectedCallback() {
    this.mediaQueryColorScheme.addEventListener('change', (e) => {
      const setColorScheme = getCookie('color_scheme');
      if (setColorScheme === 'dark' || setColorScheme === 'light') return;
      ColorSchemeSwitcher.handleChange(
        ColorSchemeSwitcher.matchesDark(e.matches)
      );
    });

    this.innerHTML = `
      <fieldset class="color-theme-switcher sans-medium-italic">
        <legend>Color Scheme</legend>       
        <label for="system">
         <input type="radio" id="system" name="color-scheme" value="system">
          System
        </label>
        <label for="dark">
          <input type="radio" id="dark" name="color-scheme" value="dark">
          Dark
        </label>
        <label for="light">
          <input type="radio" id="light" name="color-scheme" value="light">
          Light
        </label>
      </fieldset>
    `;

    const inputs = document.querySelectorAll(
      `.color-theme-switcher input`
    ) as unknown as HTMLInputElement[];

    for (const input of inputs) {
      const setColorScheme = getCookie('color_scheme');

      if (input.value === setColorScheme) {
        input.checked = true;
      }

      input.addEventListener('click', function (e) {
        const target = e.target as HTMLInputElement;
        ColorSchemeSwitcher.handleChange(target.value, true);
      });
    }
  }

  static handleChange(scheme: string | null, userToggle = false) {
    switch (scheme) {
      case 'dark':
        document.documentElement.classList.add('dark-mode');
        if (userToggle) {
          document.cookie = this.setThemeCookie('dark');
        }
        break;
      case 'light':
        document.documentElement.classList.remove('dark-mode');
        if (userToggle) {
          document.cookie = this.setThemeCookie('light');
        }
        break;
      default:
        this.handleChange(this.matchesDark(mqlDark.matches));
        if (userToggle) {
          document.cookie = this.setThemeCookie('system');
        }
    }
  }

  static matchesDark(matchBool: boolean) {
    return matchBool ? 'dark' : 'light';
  }

  static setThemeCookie(color_scheme: string) {
    const one_year = 60 * 60 * 24 * 365;
    return `color_scheme=${color_scheme}; path=/; max-age=${one_year}; samesite=strict; secure;`;
  }

  static initCookie() {
    const initialValueColorScheme = getCookie('color_scheme');
    if (!initialValueColorScheme) {
      document.cookie = this.setThemeCookie('system');
    }

    this.handleChange(initialValueColorScheme);
  }
  static init() {
    if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
      return;
    }

    this.initCookie();
    customElements.define('color-theme-switcher', ColorSchemeSwitcher);
  }
}
