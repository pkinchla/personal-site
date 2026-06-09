function siteSettingsOverlay(
  buttonElements: string = 'button[popovertarget=site-settings]',
  popoverElement: string = '#site-settings'
) {
  const buttons = document.querySelectorAll(buttonElements) as NodeList;
  const dismissButton = buttons[1] as HTMLButtonElement;
  const popover = document.querySelector(popoverElement) as HTMLDivElement;

  if (!('HTMLInstallElement' in window)) {
    document.querySelector('install')?.remove();
  }

  if (!popover) {
    return;
  }

  // When transitions aren't available, native popovertarget handles open/close/ESC/outside-click.
  const useTransition =
    !!document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!useTransition) {
    return;
  }

  let controller: AbortController | null = null;

  function open() {
    controller = new AbortController();
    const { signal } = controller;

    document.addEventListener(
      'click',
      (e) => {
        if (!popover.contains(e.target as HTMLElement) && popover.matches(':popover-open')) {
          close();
        }
      },
      { signal }
    );

    // preventDefault stops the browser's native ESC-closes-popover so we can animate it.
    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape' && popover.matches(':popover-open')) {
          e.preventDefault();
          close();
        }
      },
      { signal }
    );

    document.startViewTransition!(() => {
      popover.showPopover();
      dismissButton?.focus();
    });
  }

  function close() {
    controller?.abort();
    controller = null;
    document.startViewTransition!(() => popover.hidePopover());
  }

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (popover.matches(':popover-open')) {
        close();
      } else {
        open();
      }
    });
  });
}

export default siteSettingsOverlay;
