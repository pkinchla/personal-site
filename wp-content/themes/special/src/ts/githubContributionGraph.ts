import { fromEvent } from 'rxjs';

interface ContributionDay {
  date: string;
  contributionCount: number;
  color?: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  totalContributions?: number;
  weeks?: ContributionWeek[];
  error?: string;
}

export default class GitHubContributionGraph extends HTMLElement {
  data: ContributionData;

  constructor() {
    super();
    const dataAttr = this.getAttribute('data-contributions');
    this.data = dataAttr ? JSON.parse(dataAttr) : { error: 'No data provided' };
  }

  connectedCallback() {
    if (this.data.error) {
      this.renderError();
      return;
    }
    this.render();
    this.attachEventListeners();
  }

  render() {
    const cellSize = 12;
    const cellGap = 3;
    const weeks = this.data.weeks || [];
    const width = weeks.length * (cellSize + cellGap) + 65; // weeks across + padding for day labels
    const height = 7 * (cellSize + cellGap) + 30; // 7 days down + padding for month labels

    const svg = `
      <svg
        class="contribution-graph"
        width="${width}"
        height="${height}"
        role="group"
        aria-label="GitHub contribution activity"
      >
        ${this.renderDayLabels(cellSize, cellGap)}
        ${this.renderMonthLabels(cellSize, cellGap, weeks)}
        ${this.renderCells(cellSize, cellGap, weeks)}
      </svg>
    `;

    this.innerHTML = `
      <div class="contribution-graph-container">
        <div class="contribution-header">
          <h2 class="h3">GitHub Activity</a></h2>
          <a href="https://github.com/pkinchla" class="total-contributions">${this.data.totalContributions || 0} contributions</a>
        </div>
        <div class="contribution-graph-wrapper">
          ${svg}
        </div>
        ${this.renderLegend()}
        <div class="contribution-anchor"></div>
        <div class="contribution-tooltip" role="tooltip" aria-hidden="true"></div>
      </div>
    `;
  }

  renderDayLabels(cellSize: number, cellGap: number): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let labels = '';

    days.forEach((day, index) => {
      const y = index * (cellSize + cellGap) + 25 + cellSize / 2;
      labels += `
        <text
          x="30"
          y="${y}"
          class="day-label"
          dominant-baseline="middle"
          text-anchor="end"
          font-size="13"
          fill="currentColor"
        >
          ${day}
        </text>
      `;
    });

    return labels;
  }

  renderMonthLabels(
    cellSize: number,
    cellGap: number,
    weeks: ContributionWeek[]
  ): string {
    let labels = '';
    let lastMonth = '';
    let weekIndex = 0;

    weeks.forEach((week) => {
      if (week.contributionDays.length > 0) {
        const firstDay = week.contributionDays[0];
        const date = new Date(firstDay.date);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });

        if (monthName !== lastMonth) {
          const x = weekIndex * (cellSize + cellGap) + 38;
          labels += `
            <text
              x="${x}"
              y="15"
              class="month-label"
              text-anchor="start"
              font-size="13"
              fill="currentColor"
            >
              ${monthName}
            </text>
          `;
          lastMonth = monthName;
        }
      }
      weekIndex++;
    });

    return labels;
  }

  renderCells(
    cellSize: number,
    cellGap: number,
    weeks: ContributionWeek[]
  ): string {
    let cells = '';

    weeks.forEach((week, weekIndex) => {
      week.contributionDays.forEach((day, dayIndex) => {
        const x = weekIndex * (cellSize + cellGap) + 40;
        const y = dayIndex * (cellSize + cellGap) + 25;
        const level = this.getContributionLevel(day.contributionCount);

        cells += `
          <rect
            class="contribution-cell level-${level}"
            x="${x}"
            y="${y}"
            width="${cellSize}"
            height="${cellSize}"
            rx="2"
            data-date="${day.date}"
            data-count="${day.contributionCount}"
            role="button"
            tabindex="0"
            aria-label="${day.contributionCount} contributions on ${day.date}"
          />
        `;
      });
    });

    return cells;
  }

  renderLegend(): string {
    return `
      <div class="contribution-legend">
        <span>Less</span>
        <div class="legend-scale">
          <div class="legend-cell level-0"></div>
          <div class="legend-cell level-1"></div>
          <div class="legend-cell level-2"></div>
          <div class="legend-cell level-3"></div>
          <div class="legend-cell level-4"></div>
        </div>
        <span>More</span>
      </div>
    `;
  }

  getContributionLevel(count: number): number {
    if (count === 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 9) return 3;
    return 4;
  }

  attachEventListeners() {
    const cells = this.querySelectorAll('.contribution-cell');
    const tooltip = this.querySelector('.contribution-tooltip') as HTMLElement;
    const anchor = this.querySelector('.contribution-anchor') as HTMLElement;
    const wrapper = this.querySelector(
      '.contribution-graph-wrapper'
    ) as HTMLElement;

    let currentCell: SVGElement | null = null;

    cells.forEach((cell) => {
      fromEvent(cell, 'mouseenter').subscribe((e: Event) => {
        const target = e.target as SVGElement;
        currentCell = target;
        const date = target.getAttribute('data-date') || '';
        const count = target.getAttribute('data-count') || '0';
        this.showTooltip(tooltip, anchor, target, date, count);
      });

      fromEvent(cell, 'mouseleave').subscribe(() => {
        currentCell = null;
        this.hideTooltip(tooltip);
      });

      fromEvent(cell, 'focus').subscribe((e: Event) => {
        const target = e.target as SVGElement;
        currentCell = target;
        const date = target.getAttribute('data-date') || '';
        const count = target.getAttribute('data-count') || '0';
        this.showTooltip(tooltip, anchor, target, date, count);
      });

      fromEvent(cell, 'blur').subscribe(() => {
        currentCell = null;
        this.hideTooltip(tooltip);
      });
    });

    fromEvent(wrapper, 'scroll').subscribe(() => {
      if (currentCell) {
        this.updateTooltipPosition(anchor, currentCell);
      }
    });
  }

  showTooltip(
    tooltip: HTMLElement,
    anchor: HTMLElement,
    cell: SVGElement,
    date: string,
    count: string
  ) {
    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    tooltip.innerHTML = `
      <strong>${count} contribution${count === '1' ? '' : 's'}</strong>
      <date datetime=${date}>${formattedDate}</date>
    `;

    this.updateTooltipPosition(anchor, cell);

    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
    tooltip.setAttribute('aria-hidden', 'false');
  }

  hideTooltip(tooltip: HTMLElement) {
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
    tooltip.setAttribute('aria-hidden', 'true');
  }

  updateTooltipPosition(anchor: HTMLElement, cell: SVGElement) {
    const rect = cell.getBoundingClientRect();
    const container = this.querySelector(
      '.contribution-graph-container'
    ) as HTMLElement;
    const containerRect = container.getBoundingClientRect();

    anchor.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
    anchor.style.top = `${rect.top - containerRect.top}px`;
  }

  renderError() {
    this.innerHTML = `
      <div class="contribution-graph-error">
        <p>${this.data.error}</p>
      </div>
    `;
  }

  static init() {
    customElements.define('github-contribution-graph', GitHubContributionGraph);
  }
}
