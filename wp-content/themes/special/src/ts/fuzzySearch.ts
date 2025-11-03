import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';

interface SearchResult {
  id: number;
  title: string;
  url: string;
}

export default class FuzzySearch extends HTMLElement {
  apiEndpoint: string;

  constructor() {
    super();

    // TODO: figure env for endpoint
    this.apiEndpoint = `https://paulkinchla.com/wp-json/wp/v2/search?search=`;
  }

  connectedCallback() {
    this.innerHTML = `
      <button class="search-toggle">
        <span class="assistive-text">Search</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200">
          <path d="M1131.8 987.11 743.25 664.49a378.98 378.98 0 0 0 72.223-267.52c-10.555-95.094-56.695-182.68-129.15-245.16s-165.86-95.258-261.48-91.734a379 379 0 0 0-254.01 110.74 379.02 379.02 0 0 0-110.74 254.01c-3.527 95.613 29.242 189.02 91.73 261.48s150.07 118.59 245.16 129.15a378.97 378.97 0 0 0 267.52-72.223l322.62 388.55c39.035 44.711 189.38-105.63 144.66-144.67zM219.85 657.77a309.66 309.66 0 0 1-84.754-158.56 309.7 309.7 0 0 1 17.621-178.93 309.685 309.685 0 0 1 286.11-191.168c61.246 0 121.12 18.16 172.05 52.188a309.69 309.69 0 0 1 131.685 317.91 309.68 309.68 0 0 1-84.754 158.56 310.04 310.04 0 0 1-437.96 0z"/>
          <path d="M574.02 215.86a258.4 258.4 0 0 0-64.195-28.008 261.25 261.25 0 0 0-255.41 66.562 254.1 254.1 0 0 0-40.848 53.145 23.997 23.997 0 0 0 27.113 35.109 23.99 23.99 0 0 0 14.535-11.25 206 206 0 0 1 33.14-43.066 213.14 213.14 0 0 1 96.855-55.418 213.1 213.1 0 0 1 111.58 1.114 210.5 210.5 0 0 1 52.258 22.805 24.001 24.001 0 0 0 24.974-40.993z"/>
        </svg>
      </button>
      <dialog class="search-dialog">
        <search>    
          <label class="assistive-text" for="search">Search:</label>
          <input class="sans-regular-italic" type="text" id="search" placeholder="Search Site...">
          <ul class="results" role="list" tabindex="-1"></ul>
          <button class="dismiss-search-dialog close">
            <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 100 100">
              <line x1="22.5" y1="77.5" x2="77.5" y2="22.5" />
              <line x1="77.5" y1="77.5" x2="22.5" y2="22.5" />
            </svg>
            <span class="assistive-text">Close Site Settings</span>
          </button>            
        </search>
      </dialog>
    `;

    const input = this.querySelector('input') as HTMLInputElement;
    const resultsContainer = this.querySelector('.results') as HTMLUListElement;
    const dialog = this.querySelector('dialog') as HTMLDialogElement;
    const buttons = this.querySelectorAll('button') as NodeList;
    let currentFocusIndex = -1;

    // reset index on focus of search input
    input.addEventListener('focus', () => (currentFocusIndex = -1));

    buttons.forEach((button) =>
      button.addEventListener(
        'click',
        () => (
          dialog?.open ? dialog.close() : dialog.showModal(),
          (input.value = ''),
          (resultsContainer.innerHTML = '')
        )
      )
    );

    // send focus to results container when enter is pressed
    fromEvent<KeyboardEvent>(input, 'keydown')
      .pipe(
        map((e) => e.key),
        filter((key) => key === 'Enter')
      )
      .subscribe(() => resultsContainer.focus());

    // handle arrow keys for navigation of results
    fromEvent<KeyboardEvent>(dialog, 'keydown')
      .pipe(
        map((e) => e.key || e.code),
        filter((key) => key === 'ArrowUp' || key === 'ArrowDown')
      )
      .subscribe((key) => {
        const resultsLinksArray = Array.from(
          resultsContainer.querySelectorAll('a')
        );
        // no results, early return
        if (resultsLinksArray.length === 0) {
          return;
        }

        switch (key) {
          case 'ArrowDown':
            currentFocusIndex =
              (currentFocusIndex + 1) % resultsLinksArray.length;
            resultsLinksArray[currentFocusIndex]?.focus();
            break;
          case 'ArrowUp':
            currentFocusIndex =
              (currentFocusIndex - 1 + resultsLinksArray.length) %
              resultsLinksArray.length;
            resultsLinksArray[currentFocusIndex].focus();
        }
      });

    // populate results on keyup
    fromEvent<KeyboardEvent>(input, 'keyup')
      .pipe(
        map(() => input.value),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(async (query) => {
          if (query.trim() === '') {
            return null;
          }
          const response = await fetch(`${this.apiEndpoint}${query}`);
          const results = await response.json();

          return results.length > 0
            ? `<em class="h4">Results for: ${query}</em>` +
                results
                  .map(
                    (result: SearchResult) =>
                      `<li><a href="${result.url}">${result.title}</a></li>`
                  )
                  .join('')
            : `<li>No results for: <strong>${query}</strong></li>`;
        })
      )
      .subscribe((results) => (resultsContainer.innerHTML = results ?? ''));
  }

  static init() {
    customElements.define('fuzzy-search', FuzzySearch);
  }
}
