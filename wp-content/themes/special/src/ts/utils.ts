export function addEventListenerMulti(
  el: HTMLElement,
  listeners: string,
  fn: EventListenerOrEventListenerObject
) {
  listeners.split(' ').forEach((e) => el.addEventListener(e, fn, false));
}
