function siteSettingsOverlay(
  buttonElements: string = 'button[popovertarget=site-settings]',
  popoverElement: string = '#site-settings'
) {
  const buttons = document.querySelectorAll(buttonElements) as NodeList;
  const popover = document.querySelector(popoverElement) as HTMLDivElement;

  if (!popover) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', toggle);
  });

  function toggle(e: Event) {
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    e.preventDefault();
    popover.setAttribute('popover', 'hint');

    const is_opening = !popover?.matches(':popover-open');

    document.startViewTransition(() => {
      if (is_opening) {
        return popover.showPopover();
      }
      return popover.hidePopover();
    });
  }

  document.addEventListener('click', (e) => {
    if (
      !popover.contains(e.target as HTMLElement) &&
      popover.matches(':popover-open')
    ) {
      toggle(e);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      popover.hasAttribute('popover') &&
      popover.matches(':popover-open')
    ) {
      toggle(e);
    }
  });
}

export default siteSettingsOverlay;
