window.addEventListener("DOMContentLoaded",(function(){return function(){if("CSS"in window!=0&&"supports"in CSS!=0){var e=window.localStorage.font_weight||getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold");window.localStorage.font_weight&&document.documentElement.style.setProperty("--variable-wght-bold",window.localStorage.font_weight);var t=document.createElement("fieldset");t.classList.add("font-settings","sans-bold-italic");var o=`\n    <legend>Font Weight</legend>\n    <span>\n      <label for="range">Bold Sans-serif</label>\n      <input type="range" id="range" name="wght-bold" min="100" max="900" value=${e}>\n      <label for="number" class="assistive-text">Bold Sans-serif</label>\n      <input id="number" type="number" min="100" max="900" name="wght-bold" step="100" value=${e} />\n    </span>\n  `;t.innerHTML=o,document.getElementById("colophon").prepend(t);var n=document.querySelectorAll(".font-settings input");for(const e of n)e.addEventListener("input",(function(e){document.documentElement.style.setProperty(`--variable-${e.target.name}`,e.target.value),localStorage.setItem("font_weight",getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold")),n.forEach((e=>e.value=getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold")))}))}}(),function(){if("not all"!==window.matchMedia("(prefers-color-scheme)").media){window.localStorage.color_scheme||localStorage.setItem("color_scheme","system");var e=window.matchMedia("(prefers-color-scheme: dark)"),t=function(e){return e?"dark":"light"},o=function(n,a=!1){var l=document.querySelector("html");switch(n){case"dark":l.classList.add("dark-mode"),a&&localStorage.setItem("color_scheme","dark");break;case"light":l.classList.remove("dark-mode"),a&&localStorage.setItem("color_scheme","light");break;default:o(t(e.matches)),a&&localStorage.setItem("color_scheme","system")}};o(window.localStorage.color_scheme),e.addEventListener("change",(function(e){"dark"!==window.localStorage.color_scheme&&"light"!==window.localStorage.color_scheme&&o(t(e.matches))}));var n=document.createElement("fieldset");n.classList.add("color-theme-switcher","sans-bold-italic"),n.innerHTML='\n    <legend>Color Scheme</legend>\n    <input class="assistive-text" type="radio" id="system" name="color-scheme" value="system">\n    <label for="system">System</label>\n    <input class="assistive-text" type="radio" id="dark" name="color-scheme" value="dark">\n    <label for="dark">Dark</label>\n    <input class="assistive-text" type="radio" id="light" name="color-scheme" value="light">\n    <label for="light">Light</label>\n  ',document.getElementById("colophon").prepend(n);var a=document.querySelectorAll(".color-theme-switcher input");for(const e of a)e.value===window.localStorage.color_scheme&&(e.checked=!0),e.addEventListener("change",(function(e){o(e.target.value,!0)}))}}(),function(){var e=document.querySelector(".jump-link");if(e)e.classList.add("hidden"),new IntersectionObserver((function(t){t.forEach((function(t){t.isIntersecting?e.classList.add("hidden"):e.classList.remove("hidden")}))})).observe(document.querySelector("#home-content"))}(),function(){let e="localhost"===window.location.hostname;"serviceWorker"in navigator&&!e&&navigator.serviceWorker.register("/sw.js").then((function(){return navigator.serviceWorker.ready}))}()}));
