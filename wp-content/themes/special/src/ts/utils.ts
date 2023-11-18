export function addEventListenerMulti(
  el: HTMLElement,
  listeners: string,
  fn: EventListenerOrEventListenerObject
) {
  listeners.split(' ').forEach((e) => el.addEventListener(e, fn, false));
}


export function getCookie(name: string): string | null {
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
}