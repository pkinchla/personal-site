function siteSettingsOverlay() {
  const buttons = document.querySelectorAll(
    'button[popovertarget=site-settings]'
  );
  const popover = document.querySelector('#site-settings') as HTMLDivElement;

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

  popover.addEventListener('focusout', (e) => {
    if (popover.contains(e.relatedTarget as HTMLElement)) return;

    setTimeout(() => popover.matches(':popover-open') && toggle(e));
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
