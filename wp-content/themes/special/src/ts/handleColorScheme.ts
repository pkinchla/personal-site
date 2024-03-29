import { getCookie } from "./utils";

function handleColorScheme() {
  if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
    return;
  }

  const initialValueColorScheme = getCookie('color_scheme');


  if (!initialValueColorScheme) {
    document.cookie = "color_scheme=system; Path=/; Secure";
  }

  const mediaQueryColorScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  );

  const matchesDark = function (matchBool: boolean) {
    return matchBool ? 'dark' : 'light';
  };

  const handleChange = function (scheme: string | null, userToggle = false) {
    const htmlEl = document.querySelector('html') as HTMLHtmlElement;
    switch (scheme) {
      case 'dark':
        htmlEl.classList.add('dark-mode');
        if (userToggle) {
          document.cookie = "color_scheme=dark; Path=/; Secure";
        }
        break;
      case 'light':
        htmlEl.classList.remove('dark-mode');
        if (userToggle) {
          document.cookie = "color_scheme=light; Path=/; Secure";
        }
        break;
      default:
        handleChange(matchesDark(mediaQueryColorScheme.matches));
        if (userToggle) {
          document.cookie = "color_scheme=system; Path=/; Secure";
        }
    }
  };

  handleChange(initialValueColorScheme);

  mediaQueryColorScheme.addEventListener('change', function (e) {
    const setColorScheme = getCookie('color_scheme');
    if (
      setColorScheme === 'dark' ||
      setColorScheme === 'light'
    )
      return;
    handleChange(matchesDark(e.matches));
  });

  const element = document.createElement('fieldset') as HTMLFieldSetElement;
  element.classList.add('color-theme-switcher', 'sans-bold-italic');

  const darkToggleMarkUp = `
    <legend>Color Scheme</legend>
    <input class="assistive-text" type="radio" id="system" name="color-scheme" value="system">
    <label for="system">System</label>
    <input class="assistive-text" type="radio" id="dark" name="color-scheme" value="dark">
    <label for="dark">Dark</label>
    <input class="assistive-text" type="radio" id="light" name="color-scheme" value="light">
    <label for="light">Light</label>
  `;

  element.innerHTML = darkToggleMarkUp;
  const footer = document.getElementById('colophon') as HTMLElement;
  footer.prepend(element);

  const inputs = document.querySelectorAll(
    `.color-theme-switcher input`
  ) as unknown as HTMLInputElement[];

  for (const input of inputs) {
    const setColorScheme = getCookie('color_scheme');
    
    if (input.value === setColorScheme) {
      input.checked = true;
    }

    input.addEventListener('click', function (e) {
      const target = e.target as HTMLInputElement;
      handleChange(target.value, true);
    });
  }

}

export default handleColorScheme;
