function siteSettingsOverlay() {
  const buttons = document.querySelectorAll(
    'button[popovertarget=site-settings]'
  );
  const popover = document.querySelector('#site-settings');

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

    const is_opening = !popover?.matches(':popover-open');
    e.preventDefault();
    document.startViewTransition(() => {
      if (is_opening) {
        // @ts-expect-error ignore unknown element
        return popover?.showPopover();
      }
      // @ts-expect-error ignore unknown element
      return popover?.hidePopover();
    });
  }

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
