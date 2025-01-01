import { addEventListenerMulti } from './utils';

export default class ShareButton extends HTMLElement {
  buttonElement: HTMLButtonElement;
  buttonClass: string;
  shareTitle: string;
  shareUrl: string;
  dialog: HTMLDialogElement;
  noViewTransition: boolean;

  constructor() {
    super();

    this.noViewTransition =
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.buttonClass = this.getAttribute('button-class') || 'share-button';
    this.shareTitle = this.getAttribute('share-title') || document?.title;
    this.shareUrl = this.getAttribute('share-url') || window.location.href;

    this.innerHTML = `
      <dialog id="share-result" role="alertdialog" autofocus>
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
    this.buttonElement.addEventListener('click', () => this.shareLink());

    addEventListenerMulti(this.dialog, 'blur click', () => {
      if (this.dialog.open) {
        this.noViewTransition
          ? this.closeDialog()
          : document.startViewTransition(async () => this.closeDialog());
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.dialog.open) {
        this.noViewTransition
          ? this.closeDialog()
          : document.startViewTransition(async () => this.closeDialog());
      }
    });

    this.dialog.addEventListener('close', () => this.buttonElement.focus());
  }

  async shareLink() {
    try {
      await navigator.share({ title: this.shareTitle, url: this.shareUrl });
      this.dialog.innerHTML = 'Content shared successfully!';
      this.openDialog();
      setTimeout(() => this.closeDialog(), 3000);
    } catch (err: unknown) {
      this.dialog.innerHTML =
        (err as Error)?.message || 'Failed to share content';
      this.openDialog();
      setTimeout(() => this.closeDialog(), 3000);
    }
  }

  openDialog() {
    if (this.noViewTransition) {
      this.dialog.show();
    } else {
      document.startViewTransition(() => this.dialog.show());
    }
  }

  closeDialog() {
    if (this.noViewTransition && this.dialog.open) {
      return this.dialog.close();
    } else {
      document.startViewTransition(() => this.dialog.close());
    }
  }
  static init() {
    if (!('share' in navigator)) {
      return;
    }

    customElements.define('share-button', ShareButton);
  }
}
