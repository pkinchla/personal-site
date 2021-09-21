window.addEventListener("load",(function(){return function(){if("not all"!==window.matchMedia("(prefers-color-scheme)").media){window.localStorage.color_scheme||localStorage.setItem("color_scheme","system");var e=window.matchMedia("(prefers-color-scheme: dark)"),o=function(e){return e?"dark":"light"},t=function(l,a=!1){var r=document.querySelector("html");switch(l){case"dark":r.classList.add("dark-mode"),a&&localStorage.setItem("color_scheme","dark");break;case"light":r.classList.remove("dark-mode"),a&&localStorage.setItem("color_scheme","light");break;default:t(o(e.matches)),a&&localStorage.setItem("color_scheme","system")}};t(window.localStorage.color_scheme),e.addEventListener("change",(function(e){"dark"!==window.localStorage.color_scheme&&"light"!==window.localStorage.color_scheme&&t(o(e.matches))}));var l=document.createElement("fieldset");l.classList.add("color-theme-switcher"),l.innerHTML='\n    <legend>Color Scheme</legend>\n    <input type="radio" id="system" name="color-scheme" value="system">\n    <label for="system">System</label>\n    <input type="radio" id="dark" name="color-scheme" value="dark">\n    <label for="dark">Dark</label>\n    <input type="radio" id="light" name="color-scheme" value="light">\n    <label for="light">Light</label>\n  ',document.getElementById("colophon").prepend(l);var a=document.querySelectorAll(".color-theme-switcher input");for(const e of a)e.value===window.localStorage.color_scheme&&(e.checked=!0),e.addEventListener("change",(function(e){t(e.target.value,!0)}))}}(),!0}));
