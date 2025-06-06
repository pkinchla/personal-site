import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { addEventListenerMulti } from './utils';

export default class FontSettingsControl extends HTMLElement {
  defaultWght = 707;
  fontProperty: string;
  constructor() {
    super();
    this.fontProperty =
      this.getAttribute('font-property') || '--variable-wght-bold';
  }

  connectedCallback() {
    this.defaultWght =
      window.localStorage.font_weight ||
      getComputedStyle(document.documentElement).getPropertyValue(
        this.fontProperty
      );

    if (window.localStorage.font_weight) {
      document.documentElement.style.setProperty(
        this.fontProperty,
        window.localStorage.font_weight
      );
    }

    this.innerHTML = `
    <fieldset class="font-settings sans-medium-italic">
      <legend>Font Weight</legend>
      <span>
        <label for="range">Headings</label>
        <input type="range" id="range" name="wght-bold" min="100" max="900" value=${this.defaultWght}>
        <label for="number" class="assistive-text">Bold Sans-serif</label>
        <span class="number">
          <button class="decrement">
            <span class='assistive-text'>decrement font weight</span>
            <span aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="M88.2 38.5c6.2 0 11.2 4.9 11.2 11.1 0 6.2-5 11.2-11.2 11.3l-27.1.2-22.3.2-27 .2C5.6 61.5.6 56.6.6 50.4c0-6.2 5-11.2 11.2-11.3l27.1-.2 22.3-.2 27-.2z" />
              </svg>
            </span>          
          </button>
          <input pattern="[0-9]*" id="number" type="number" inputmode="numeric" min="100" max="900" step="100" name="wght-bold" value=${this.defaultWght} />
          <button class="increment">
            <span class='assistive-text'>increment font weight</span>
            <span aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="M88.2 38.5c6.2 0 11.2 4.9 11.2 11.1 0 6.2-5 11.2-11.2 11.3l-27.1.2-.2 27.1c-.1 6.1-5.1 11.1-11.3 11.1-6.2 0-11.1-5-11.1-11.1l.2-26.9-27 .2C5.5 61.5.5 56.6.5 50.4c0-6.2 5-11.2 11.2-11.3l27.1-.2.2-27.1C39.1 5.7 44.1.7 50.3.7c6.2 0 11.1 5 11.1 11.1l-.2 26.9 27-.2z" />
              </svg>
            </span>          
          </button>
          <span class="current-weight assistive-text" aria-live="assertive">current font weight is ${this.defaultWght}</span>
        </span>
      </span>
    </fieldset>`;

    const inputs = document.querySelectorAll(
      '.font-settings input'
    ) as unknown as HTMLInputElement[];

    const buttons = document.querySelectorAll(
      '.font-settings button'
    ) as unknown as HTMLButtonElement[];

    const numberInput = document.querySelector(
      '.font-settings input[type="number"'
    ) as HTMLInputElement;

    for (const button of buttons) {
      button.addEventListener('click', function (e) {
        const target = e.currentTarget as HTMLButtonElement;

        if (target.classList.contains('increment')) {
          numberInput.stepUp();
          updateFontWeight(numberInput.value);
        }

        if (target.classList.contains('decrement')) {
          numberInput.stepDown();
          updateFontWeight(numberInput.value);
        }
      });
    }

    for (const input of inputs) {
      addEventListenerMulti(input, 'change input', function (e) {
        const target = e.target as HTMLInputElement;
        if (target.type === 'number') {
          return;
        }
        updateFontWeight(target.value);
      });
    }

    fromEvent(numberInput, 'input')
      .pipe(
        map((e) => {
          const target = e.target as HTMLInputElement;
          if (target.value.length > 3) {
            target.value = target.value.slice(0, 3);
          }

          return target.value;
        }),
        distinctUntilChanged(),
        debounceTime(300),
        tap((value: string) => updateFontWeight(value))
      )
      .subscribe();

    const updateFontWeight = (value: string) => {
      document.documentElement.style.setProperty(this.fontProperty, value);
      localStorage.setItem('font_weight', value);

      const currentWeight = document.querySelector(
        '.current-weight'
      ) as HTMLElement;

      currentWeight.innerText = `Current font weight is ${getComputedStyle(
        document.documentElement
      ).getPropertyValue(this.fontProperty)}`;

      inputs.forEach(
        (input) =>
          (input.value = getComputedStyle(
            document.documentElement
          ).getPropertyValue(this.fontProperty))
      );
    };
  }

  static init() {
    if ('CSS' in window === false || 'supports' in CSS === false) {
      return;
    }

    customElements.define('font-settings', FontSettingsControl);
  }
}
