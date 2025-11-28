function siteSettingsOverlay(
  buttonElements: string = 'button[popovertarget=site-settings]',
  popoverElement: string = '#site-settings'
) {
  const buttons = document.querySelectorAll(buttonElements) as NodeList;
  const dismissButton = buttons[1] as HTMLButtonElement;
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
        popover.showPopover();
        return dismissButton?.focus();
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
  // TODO: fix this overlay click and focus out issues
  // when popover loses focuses close it
  // document.addEventListener('focusout', (e) =>
  //   requestAnimationFrame(() => !popover.contains(e.relatedTarget) && toggle(e))
  // );
}

export default siteSettingsOverlay;
