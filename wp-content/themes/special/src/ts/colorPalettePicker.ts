import palettes, { type Palette } from './palettes';

const LS_KEY = 'palette';
const DEFAULT = palettes[0].slug;

export default class ColorPalettePicker extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    const current = ColorPalettePicker.stored();

    const swatch = (colors: Palette['light']) =>
      `<span class="palette-swatch-row">${colors
        .map((c) => `<span style="background:${c}"></span>`)
        .join('')}</span>`;

    this.innerHTML = `
      <fieldset class="color-palette-picker sans-medium-italic surface">
        <legend>Color Palette</legend>
        <div class="palette-options">
          ${palettes
            .map(
              (p) => `
          <label for="palette-${p.slug}">
            <input type="radio" id="palette-${p.slug}" name="color-palette" value="${p.slug}"${p.slug === current ? ' checked' : ''}>
            <span class="palette-swatch" aria-hidden="true">${swatch(p.light)}${swatch(p.dark)}</span>
            <span class="palette-name">${p.name}</span>
          </label>`
            )
            .join('')}
        </div>
      </fieldset>
    `;

    this.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.name !== 'color-palette') return;
      ColorPalettePicker.applyPalette(target.value, true);
    });
  }

  private static stored(): string {
    try {
      const value = localStorage.getItem(LS_KEY);
      if (value && palettes.some((p) => p.slug === value)) return value;
    } catch {
      // storage blocked — fall through to the default
    }
    return DEFAULT;
  }

  static applyPalette(slug: string, persist = false) {
    const palette = palettes.find((p) => p.slug === slug) ?? palettes[0];
    const root = document.documentElement;

    if (palette.slug === DEFAULT) {
      delete root.dataset.palette;
    } else {
      root.dataset.palette = palette.slug;
    }

    for (const meta of document.querySelectorAll<HTMLMetaElement>(
      'meta[name="theme-color"]'
    )) {
      const dark = meta.media.includes('dark');
      meta.content = dark ? palette.dark[0] : palette.light[0];
    }

    if (persist) {
      try {
        if (palette.slug === DEFAULT) {
          localStorage.removeItem(LS_KEY);
        } else {
          localStorage.setItem(LS_KEY, palette.slug);
        }
      } catch {
        // storage blocked — the palette still applies for this page view
      }
    }
  }

  static init() {
    ColorPalettePicker.applyPalette(ColorPalettePicker.stored());
    customElements.define('color-palette-picker', ColorPalettePicker);
  }
}
