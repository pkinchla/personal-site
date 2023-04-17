!function(){if(!("customElements"in window)||!("fetch"in window))return;const e="speedlify-score";class t{constructor(){this.fetches={},this.responses={},this.urls={}}static normalizeUrl(e,t){return`${e}${e.endsWith("/")?"":"/"}`+(t.startsWith("/")?t.substr(1):t)}async fetch(e,s){if(this.urls[e])return!!this.urls[e][s]&&this.urls[e][s].hash;this.fetches[e]||(this.fetches[e]=fetch(t.normalizeUrl(e,"api/urls.json")));let r=await this.fetches[e];this.responses[e]||(this.responses[e]=r.json());let a=await this.responses[e];return this.urls[e]=a,!!a[s]&&a[s].hash}}const s=new t;customElements.define(e,class extends HTMLElement{connectedCallback(){this.speedlifyUrl=this.getAttribute("speedlify-url"),this.shorthash=this.getAttribute("hash"),this.rawData=this.getAttribute("raw-data"),this.url=this.getAttribute("url")||window.location.href,this.urlStore=s,this.rawData||this.speedlifyUrl?this.init():console.log(`Missing \`speedlify-url\` attributes in <${e}>`)}async init(){if(this.rawData){let e=JSON.parse(this.rawData);return this.setTimeAttributes(e),void(this.innerHTML=this.render(e))}let t=this.shorthash;if(t||(t=await this.urlStore.fetch(this.speedlifyUrl,this.url)),!t)return void console.error(`<${e}> could not find hash for URL: ${this.url}`);let s=await this.fetchData(t);this.setTimeAttributes(s),this.innerHTML=this.render(s)}async fetchData(e){let s=await fetch(t.normalizeUrl(this.speedlifyUrl,`api/${e}.json`));return await s.json()}setTimeAttributes(e){e.timestamp&&(this.setAttribute("title",`Results from ${this.timeAgo(e.timestamp)}`),this.setAttribute("data-timestamp",e.timestamp))}timeAgo(e){let t=Math.floor((new Date-e)/864e5);return`${t} day${1!=t?"s":""} ago`}getScoreClass(e){return e<.5?"speedlify-score speedlify-score-bad":e<.9?"speedlify-score speedlify-score-ok":"speedlify-score speedlify-score-good"}getScoreTemplate(e){let t=[];return t.push(`<span title="Performance" class="${this.getScoreClass(e.lighthouse.performance)}">${parseInt(100*e.lighthouse.performance,10)}</span>`),t.push(`<span title="Accessibility" class="${this.getScoreClass(e.lighthouse.accessibility)}">${parseInt(100*e.lighthouse.accessibility,10)}</span>`),t.push(`<span title="Best Practices" class="${this.getScoreClass(e.lighthouse.bestPractices)}">${parseInt(100*e.lighthouse.bestPractices,10)}</span>`),t.push(`<span title="SEO" class="${this.getScoreClass(e.lighthouse.seo)}">${parseInt(100*e.lighthouse.seo,10)}</span>`),t.join(" ")}render(e){let t=[],s=this.getScoreTemplate(e);(this.hasAttribute("requests")||this.hasAttribute("weight")||this.hasAttribute("rank"))&&!this.hasAttribute("score")||t.push(s);let r=e.weight.summary.split(" • ");if(this.hasAttribute("requests")&&t.push(`<span class="speedlify-requests">${r[0]}</span>`),this.hasAttribute("weight")&&t.push(`<span class="speedlify-weight">${r[1]}</span>`),this.hasAttribute("rank")){let s=this.getAttribute("rank-url");t.push(`<${s?`a href="${s}"`:"span"} class="speedlify-rank">${e.ranks.cumulative}</${s?"a":"span"}>`)}if(this.hasAttribute("rank-change")&&e.previousRanks){let s=e.previousRanks.cumulative-e.ranks.cumulative;t.push(`<span class="speedlify-rank-change ${s>0?"up":s<0?"down":"same"}">${0!==s?Math.abs(s):""}</span>`)}return t.join("")}})}(),window.addEventListener("DOMContentLoaded",(function(){return document.querySelector("html").classList.remove("no-js"),function(){if("CSS"in window!=0&&"supports"in CSS!=0){var e=window.localStorage.font_weight||getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold");window.localStorage.font_weight&&document.documentElement.style.setProperty("--variable-wght-bold",window.localStorage.font_weight);var t=document.createElement("fieldset");t.classList.add("font-settings","sans-bold-italic");var s=`\n    <legend>Font Weight</legend>\n    <span>\n      <label for="range">Bold Sans-serif</label>\n      <input type="range" id="range" name="wght-bold" min="100" max="900" value=${e}>\n      <label for="number" class="assistive-text">Bold Sans-serif</label>\n      <span class="number">\n        <input aria-describedby="number-error" pattern="[0-9]+" id="number" pattern="" type="text" min="100" max="900" maxlength="3" name="wght-bold" value=${e} />\n        <span id="number-error" class="field-error" aria-live="assertive"></span>\n      </span>\n    </span>\n  `;t.innerHTML=s,document.getElementById("colophon").prepend(t);var r=document.querySelectorAll(".font-settings input");for(const e of r)a(e),e.addEventListener("input",(function(e){a(e.target),document.documentElement.style.setProperty(`--variable-${e.target.name}`,e.target.value),localStorage.setItem("font_weight",getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold")),r.forEach((e=>e.value=getComputedStyle(document.documentElement).getPropertyValue("--variable-wght-bold")))}))}function a(e){const t=e.validity.valid,s="text"===e.type,r=document.getElementById("number-error");t&&s?(r.innerText="",e.removeAttribute("aria-invalid","false")):(r.innerText="Please enter a number",e.setAttribute("aria-invalid","true"))}}(),function(){if("not all"!==window.matchMedia("(prefers-color-scheme)").media){window.localStorage.color_scheme||localStorage.setItem("color_scheme","system");var e=window.matchMedia("(prefers-color-scheme: dark)"),t=function(e){return e?"dark":"light"},s=function(r,a=!1){var i=document.querySelector("html");switch(r){case"dark":i.classList.add("dark-mode"),a&&localStorage.setItem("color_scheme","dark");break;case"light":i.classList.remove("dark-mode"),a&&localStorage.setItem("color_scheme","light");break;default:s(t(e.matches)),a&&localStorage.setItem("color_scheme","system")}};s(window.localStorage.color_scheme),e.addEventListener("change",(function(e){"dark"!==window.localStorage.color_scheme&&"light"!==window.localStorage.color_scheme&&s(t(e.matches))}));var r=document.createElement("fieldset");r.classList.add("color-theme-switcher","sans-bold-italic"),r.innerHTML='\n    <legend>Color Scheme</legend>\n    <input class="assistive-text" type="radio" id="system" name="color-scheme" value="system">\n    <label for="system">System</label>\n    <input class="assistive-text" type="radio" id="dark" name="color-scheme" value="dark">\n    <label for="dark">Dark</label>\n    <input class="assistive-text" type="radio" id="light" name="color-scheme" value="light">\n    <label for="light">Light</label>\n  ',document.getElementById("colophon").prepend(r);var a=document.querySelectorAll(".color-theme-switcher input");for(const e of a)e.value===window.localStorage.color_scheme&&(e.checked=!0),e.addEventListener("change",(function(e){s(e.target.value,!0)}))}}(),function(){var e=document.querySelector(".jump-link");if(e)e.classList.add("hidden"),new IntersectionObserver((function(t){t.forEach((function(t){t.isIntersecting?e.classList.add("hidden"):e.classList.remove("hidden")}))})).observe(document.querySelector("#home-content"))}(),function(){let e="localhost"===window.location.hostname;"serviceWorker"in navigator&&!e&&navigator.serviceWorker.register("/sw.js").then((function(){return navigator.serviceWorker.ready}))}()}));
