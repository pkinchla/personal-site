/**
 * Hand-maintained typings for the vendored speedlify2-score.js.
 *
 * TypeScript picks this up automatically for any import of
 * `./speedlify2-score.js` in this directory (a sibling .d.ts takes priority
 * over allowJs inference) — nothing else needs to change to get typed
 * imports. Deliberately kept in a separate file rather than converting the
 * .js itself: `pnpm fetch:speedlify2-score` overwrites speedlify2-score.js
 * verbatim from upstream, so anything written directly into that file would
 * be lost on the next re-fetch. Update this file by hand if a re-fetch
 * changes the upstream shape.
 */

/** The JSON payload served at `api/site/<slug>.json`. */
export interface SpeedlifySiteData {
	measured: boolean;
	url: string;
	name: string;
	page?: string;
	total: number;
	rank?: number;
	updated?: string;
	stale?: boolean;
	generator?: string;
	host?: string;
	axe: number | null;
	lighthouse?: {
		performance?: number;
		accessibility?: number;
		bestPractices?: number;
		seo?: number;
	};
	cwv?: {
		pass: boolean | null;
		source?: "field" | "lab";
	} | null;
	metrics?: {
		lcp?: number;
		weight?: number;
		requests?: number;
	};
}

/** One drawn ring: a track, an optional arc, and a centered value. */
export interface SpeedlifyRingOptions {
	band: "good" | "average" | "poor" | "none" | "skeleton";
	text: string;
	label: string;
	pct: number | null;
	sublabel?: string;
}

export declare class SpeedlifyStore {
	fetches: Map<string, Promise<SpeedlifySiteData>>;

	static join(base: string, path: string): string;
	static normalizeUrl(url: string): string;
	static slug(url: string): string;

	fetch(apiUrl: string): Promise<SpeedlifySiteData>;
	load(speedlifyUrl: string, options: { url: string }): Promise<SpeedlifySiteData>;
}

export declare class SpeedlifyScore extends HTMLElement {
	static readonly tagName: string;
	static readonly attrs: {
		speedlifyUrl: string;
		url: string;
		theme: string;
		noTooltip: string;
	};
	static readonly css: string;
	static readonly geometry: {
		size: number;
		stroke: number;
		r: number;
		c: number;
		circumference: number;
	};

	static register(tagName?: string): void;
	static escape(value: unknown): string;

	readonly noTooltip: boolean;
	readonly speedlifyUrl: string;

	connectedCallback(): void;
	renderSkeleton(): void;
	init(): Promise<void>;

	scoreClass(value: unknown): "good" | "average" | "poor" | "none";
	ring(options: SpeedlifyRingOptions): string;
	scoreHtml(label: string, value: number | undefined): string;
	shortCount(n: number): string;
	axeHtml(value: number | undefined): string;
	cwvHtml(cwv: SpeedlifySiteData["cwv"]): string;
	bytes(n: number | undefined): string;
	ms(n: number | undefined): string;
	since(iso: string | undefined): string;
	tooltip(data: SpeedlifySiteData): string;
	render(data: SpeedlifySiteData): string;
}
