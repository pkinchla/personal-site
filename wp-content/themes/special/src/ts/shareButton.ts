import { addEventListenerMulti } from './utils';

export default class ShareButton extends HTMLElement {
  buttonElement: HTMLButtonElement;
  buttonClass: string;
  shareTitle: string;
  shareUrl: string;
  dialog: HTMLDialogElement;

  constructor() {
    super();

    this.buttonClass = this.getAttribute('button-class') || 'share-button';
    this.shareTitle = this.getAttribute('share-title') || document?.title;
    this.shareUrl = this.getAttribute('share-url') || window.location.href;

    this.innerHTML = `
      <dialog id="share-result" class="no-offset" role="alertdialog">
      </dialog>
      <button id="share-button" class="${this.buttonClass}">
        Share
      </button>

    `;

    this.buttonElement = this.querySelector(
      '#share-button'
    ) as HTMLButtonElement;

    this.dialog = this.querySelector('#share-result') as HTMLDialogElement;
  }
  connectedCallback() {
    this.buttonElement.addEventListener('click', () => {
      document.startViewTransition(async () => {
        try {
          await navigator.share({ title: this.shareTitle, url: this.shareUrl });
          this.dialog.innerHTML = 'Content shared successfully!';
          this.dialog.show();
        } catch (err: unknown) {
          this.dialog.innerHTML =
            (err as Error)?.message || 'Failed to share content';
          this.dialog.show();
        }
      });
    });

    addEventListenerMulti(this.dialog, 'blur click close', () =>
      document.startViewTransition(async () => this.dialog.close())
    );

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.dialog.open) {
        document.startViewTransition(async () => this.dialog.close());
      }
    });

    this.dialog.addEventListener('close', () => this.buttonElement.focus());
  }
  static init() {
    if (!('share' in navigator)) {
      return;
    }

    customElements.define('share-button', ShareButton);
  }
}
