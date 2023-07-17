function addEventListenerMulti(el, listeners, fn) {
    listeners.split(' ').forEach((e) => el.addEventListener(e, fn, false));
}

function fontSettings() {
    if ('CSS' in window === false || 'supports' in CSS === false) {
        return;
    }
    const defaultWght = window.localStorage.font_weight ||
        getComputedStyle(document.documentElement).getPropertyValue('--variable-wght-bold');
    if (window.localStorage.font_weight) {
        document.documentElement.style.setProperty(`--variable-wght-bold`, window.localStorage.font_weight);
    }
    const element = document.createElement('fieldset');
    element.classList.add('font-settings', 'sans-bold-italic');
    const fontSettingsMarkUp = `
    <legend>Font Weight</legend>
    <span>
      <label for="range">Bold Sans-serif</label>
      <input type="range" id="range" name="wght-bold" min="100" max="900" value=${defaultWght}>
      <label for="number" class="assistive-text">Bold Sans-serif</label>
      <span class="number">
        <button class="decrement">
          <span class='assistive-text'>decrement font weight</span>
          <span aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path d="M88.2 38.5c6.2 0 11.2 4.9 11.2 11.1 0 6.2-5 11.2-11.2 11.3l-27.1.2-22.3.2-27 .2C5.6 61.5.6 56.6.6 50.4c0-6.2 5-11.2 11.2-11.3l27.1-.2 22.3-.2 27-.2z" />
            </svg>
          </span>          
        </button>
        <input pattern="[0-9]*" id="number" type="number" min="100" max="900" step="100" maxlength="3" name="wght-bold" value=${defaultWght} />
        <button class="increment">
          <span class='assistive-text'>increment font weight</span>
          <span aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path d="M88.2 38.5c6.2 0 11.2 4.9 11.2 11.1 0 6.2-5 11.2-11.2 11.3l-27.1.2-.2 27.1c-.1 6.1-5.1 11.1-11.3 11.1-6.2 0-11.1-5-11.1-11.1l.2-26.9-27 .2C5.5 61.5.5 56.6.5 50.4c0-6.2 5-11.2 11.2-11.3l27.1-.2.2-27.1C39.1 5.7 44.1.7 50.3.7c6.2 0 11.1 5 11.1 11.1l-.2 26.9 27-.2z" />
            </svg>
          </span>          
        </button>
        <span class="current-weight assistive-text" aria-live="assertive">current font weight is ${defaultWght}</span>
      </span>
    </span>
  `;
    element.innerHTML = fontSettingsMarkUp;
    const footer = document.getElementById('colophon');
    footer.prepend(element);
    const inputs = document.querySelectorAll('.font-settings input');
    const buttons = document.querySelectorAll('.font-settings button');
    const numberInput = document.querySelector('.font-settings input[type="number"');
    for (const button of buttons) {
        button.addEventListener('click', function (e) {
            const target = e.currentTarget;
            if (target.classList.contains('increment')) {
                numberInput.stepUp();
                updateFontWeight(numberInput.value);
            }
            if (target.classList.contains('decrement')) {
                numberInput.stepDown();
                updateFontWeight(numberInput.value);
            }
        });
    }
    for (const input of inputs) {
        addEventListenerMulti(input, 'change input', function (e) {
            const target = e.target;
            updateFontWeight(target.value);
        });
    }
    const updateFontWeight = (value) => {
        document.documentElement.style.setProperty('--variable-wght-bold', value);
        localStorage.setItem('font_weight', value);
        const currentWeight = document.querySelector('.current-weight');
        currentWeight.innerText = `Current font weight is ${getComputedStyle(document.documentElement).getPropertyValue('--variable-wght-bold')}`;
        inputs.forEach((input) => (input.value = getComputedStyle(document.documentElement).getPropertyValue('--variable-wght-bold')));
    };
}

function handleColorScheme() {
    if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
        return;
    }
    if (!window.localStorage.color_scheme) {
        localStorage.setItem('color_scheme', 'system');
    }
    const mediaQueryColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const matchesDark = function (matchBool) {
        return matchBool ? 'dark' : 'light';
    };
    const handleChange = function (scheme, userToggle = false) {
        const htmlEl = document.querySelector('html');
        switch (scheme) {
            case 'dark':
                htmlEl.classList.add('dark-mode');
                if (userToggle) {
                    localStorage.setItem('color_scheme', 'dark');
                }
                break;
            case 'light':
                htmlEl.classList.remove('dark-mode');
                if (userToggle) {
                    localStorage.setItem('color_scheme', 'light');
                }
                break;
            default:
                handleChange(matchesDark(mediaQueryColorScheme.matches));
                if (userToggle) {
                    localStorage.setItem('color_scheme', 'system');
                }
        }
    };
    handleChange(window.localStorage.color_scheme);
    mediaQueryColorScheme.addEventListener('change', function (e) {
        if (window.localStorage.color_scheme === 'dark' ||
            window.localStorage.color_scheme === 'light')
            return;
        handleChange(matchesDark(e.matches));
    });
    const element = document.createElement('fieldset');
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
    const footer = document.getElementById('colophon');
    footer.prepend(element);
    const inputs = document.querySelectorAll(`.color-theme-switcher input`);
    for (const input of inputs) {
        if (input.value === window.localStorage.color_scheme) {
            input.checked = true;
        }
        input.addEventListener('click', function (e) {
            const target = e.target;
            handleChange(target.value, true);
        });
    }
}

function observeHero() {
    const jumpLink = document.querySelector('.jump-link');
    const linkTarget = document.querySelector('#home-content');
    // exit early
    if (!jumpLink) {
        return;
    }
    // prevent flash of links before observer is abstantiated
    jumpLink.classList.add('hidden');
    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                jumpLink.classList.add('hidden');
            }
            else {
                jumpLink.classList.remove('hidden');
            }
        });
    }
    const observer = new IntersectionObserver(handleIntersection);
    return observer.observe(linkTarget);
}

function invokeServiceWorker() {
    const devEnv = window.location.hostname === 'localhost';
    if ('serviceWorker' in navigator && !devEnv) {
        navigator.serviceWorker.register('/sw.js').then(function () {
            return navigator.serviceWorker.ready;
        });
    }
}

function checkJSLoaded() {
    const htmlEl = document.querySelector('html');
    htmlEl.classList.remove('no-js');
}

(function() {
	if(!("customElements" in window) || !("fetch" in window)) {
		return;
	}

	const NAME = "speedlify-score";

	class SpeedlifyUrlStore {
		constructor() {
			this.fetches = {};
			this.responses = {};
			this.urls = {};
		}

		static normalizeUrl(speedlifyUrl, path) {
			let host = `${speedlifyUrl}${speedlifyUrl.endsWith("/") ? "" : "/"}`;
			return host + (path.startsWith("/") ? path.substr(1) : path);
		}

		async fetch(speedlifyUrl, url) {
			if(this.urls[speedlifyUrl]) {
				return this.urls[speedlifyUrl][url] ? this.urls[speedlifyUrl][url].hash : false;
			}

			if(!this.fetches[speedlifyUrl]) {
				this.fetches[speedlifyUrl] = fetch(SpeedlifyUrlStore.normalizeUrl(speedlifyUrl, "api/urls.json"));
			}

			let response = await this.fetches[speedlifyUrl];

			if(!this.responses[speedlifyUrl]) {
				this.responses[speedlifyUrl] = response.json();
			}

			let json = await this.responses[speedlifyUrl];

			this.urls[speedlifyUrl] = json;

			return json[url] ? json[url].hash : false;
		}
	}

	const urlStore = new SpeedlifyUrlStore();

	customElements.define(NAME, class extends HTMLElement {
		connectedCallback() {
			this.speedlifyUrl = this.getAttribute("speedlify-url");
			this.shorthash = this.getAttribute("hash");
			this.rawData = this.getAttribute("raw-data");
			this.url = this.getAttribute("url") || window.location.href;
			this.urlStore = urlStore;

			if(!this.rawData && !this.speedlifyUrl) {
				console.log(`Missing \`speedlify-url\` attributes in <${NAME}>`);
				return;
			}

			// lol async in constructors
			this.init();
		}

		async init() {
			if(this.rawData) {
				let data = JSON.parse(this.rawData);
				this.setTimeAttributes(data);
				this.innerHTML = this.render(data);
				return;
			}

			let hash = this.shorthash;
			if(!hash) {
				// It’s much faster if you supply a `hash` attribute!
				hash = await this.urlStore.fetch(this.speedlifyUrl, this.url);
			}

			if(!hash) {
				console.error( `<${NAME}> could not find hash for URL: ${this.url}` );
				return;
			}

			let data = await this.fetchData(hash);
			this.setTimeAttributes(data);
			this.innerHTML = this.render(data);
		}

		async fetchData(hash) {
			let response = await fetch(SpeedlifyUrlStore.normalizeUrl(this.speedlifyUrl, `api/${hash}.json`));
			let json = await response.json();

			return json;
		}

		setTimeAttributes(data) {
			if(data.timestamp) {
				this.setAttribute("title", `Results from ${this.timeAgo(data.timestamp)}`);
				this.setAttribute("data-timestamp", data.timestamp);
			}
		}

		timeAgo(timestamp) {
			let days = Math.floor((new Date() - timestamp) / (1000*60*60*24));
			return `${days} day${days != 1 ? "s" : ""} ago`;
		}

		getScoreClass(score) {
			if(score < .5) {
				return "speedlify-score speedlify-score-bad";
			}
			if(score < .9) {
				return "speedlify-score speedlify-score-ok";
			}
			return "speedlify-score speedlify-score-good";
		}

		getScoreTemplate(data) {
			let scores = [];
			scores.push(`<span title="Performance" class="${this.getScoreClass(data.lighthouse.performance)}">${parseInt(data.lighthouse.performance * 100, 10)}</span>`);
			scores.push(`<span title="Accessibility" class="${this.getScoreClass(data.lighthouse.accessibility)}">${parseInt(data.lighthouse.accessibility * 100, 10)}</span>`);
			scores.push(`<span title="Best Practices" class="${this.getScoreClass(data.lighthouse.bestPractices)}">${parseInt(data.lighthouse.bestPractices * 100, 10)}</span>`);
			scores.push(`<span title="SEO" class="${this.getScoreClass(data.lighthouse.seo)}">${parseInt(data.lighthouse.seo * 100, 10)}</span>`);
			return scores.join(" ");
		}

		render(data) {
			let content = [];
			let scoreHtml = this.getScoreTemplate(data);
			if(!this.hasAttribute("requests") && !this.hasAttribute("weight") && !this.hasAttribute("rank") || this.hasAttribute("score")) {
				content.push(scoreHtml);
			}

			let summarySplit = data.weight.summary.split(" • ");
			if(this.hasAttribute("requests")) {
				content.push(`<span class="speedlify-requests">${summarySplit[0]}</span>`);
			}
			if(this.hasAttribute("weight")) {
				content.push(`<span class="speedlify-weight">${summarySplit[1]}</span>`);
			}
			if(this.hasAttribute("rank")) {
				let rankUrl = this.getAttribute("rank-url");
				content.push(`<${rankUrl ? `a href="${rankUrl}"` : "span"} class="speedlify-rank">${data.ranks.cumulative}</${rankUrl ? "a" : "span"}>`);
			}
			if(this.hasAttribute("rank-change") && data.previousRanks) {
				let change = data.previousRanks.cumulative - data.ranks.cumulative;
				content.push(`<span class="speedlify-rank-change ${change > 0 ? "up" : (change < 0 ? "down" : "same")}">${change !== 0 ? Math.abs(change) : ""}</span>`);
			}

			return content.join("");
		}
	});
})();

function scripts() {
    return (checkJSLoaded(),
        fontSettings(),
        handleColorScheme(),
        observeHero(),
        invokeServiceWorker());
}
window.addEventListener('DOMContentLoaded', scripts);
//# sourceMappingURL=main.js.map
