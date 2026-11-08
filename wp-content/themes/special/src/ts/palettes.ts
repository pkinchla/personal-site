export interface Palette {
  slug: string;
  name: string;
  /** [body background, secondary, tertiary] — used for swatches and theme-color */
  light: [string, string, string];
  dark: [string, string, string];
}

/** Keep in sync with src/css/palettes.css. The first entry is the default. */
const palettes: Palette[] = [
  {
    slug: 'graphite-and-volt',
    name: 'Graphite & Volt',
    light: ['#f5f5f5', '#26292e', '#9a61ea'],
    dark: ['#121416', '#c4f16a', '#8a54d4'],
  },
  {
    slug: 'slate-and-aqua',
    name: 'Slate & Aqua',
    light: ['#f3f8fa', '#163749', '#e942a1'],
    dark: ['#0b151c', '#65f0f0', '#cd2189'],
  },
  {
    slug: 'carbon-and-tangerine',
    name: 'Carbon & Tangerine',
    light: ['#f7f4f2', '#332c29', '#1781f0'],
    dark: ['#14110f', '#feba7e', '#0266c7'],
  },
  {
    slug: 'oxblood-and-brass',
    name: 'Oxblood & Brass',
    light: ['#f8f3eb', '#62141a', '#a57e15'],
    dark: ['#1c100f', '#efcc83', '#c43443'],
  },
  {
    slug: 'moss-and-lilac',
    name: 'Moss & Lilac',
    light: ['#f4f6ef', '#274018', '#9c75d9'],
    dark: ['#111810', '#d9c6fe', '#457820'],
  },
  {
    slug: 'cobalt-and-sherbet',
    name: 'Cobalt & Sherbet',
    light: ['#f4f7fc', '#0f2e94', '#e26040'],
    dark: ['#091025', '#fec1a6', '#b94224'],
  },
  {
    slug: 'charcoal-and-flamingo',
    name: 'Charcoal & Flamingo',
    light: ['#f7f4f5', '#292529', '#038d88'],
    dark: ['#131113', '#feb0ce', '#04736f'],
  },
  {
    slug: 'spruce-and-ice',
    name: 'Spruce & Ice',
    light: ['#eef7f8', '#013631', '#ea4747'],
    dark: ['#021314', '#a6edf0', '#d32e33'],
  },
  {
    slug: 'ultraviolet-and-mint',
    name: 'Ultraviolet & Mint',
    light: ['#f8f5fd', '#3c1475', '#04956b'],
    dark: ['#110b1f', '#84f1c4', '#9847ca'],
  },
  {
    slug: 'heirloom',
    name: 'Heirloom',
    light: ['#f1f1f1', '#143f40', '#e83dbd'],
    dark: ['#1b2127', '#d1d1d1', '#c52aa0'],
  },
  {
    slug: 'pine-and-persimmon',
    name: 'Pine & Persimmon',
    light: ['#f6f4eb', '#133f2b', '#e7581a'],
    dark: ['#121e18', '#b9e4c6', '#c34901'],
  },
  {
    slug: 'ink-and-marigold',
    name: 'Ink & Marigold',
    light: ['#faf6ef', '#132b5a', '#bf6e06'],
    dark: ['#0d1528', '#f0dcb1', '#a65f05'],
  },
  {
    slug: 'plum-and-peach',
    name: 'Plum & Peach',
    light: ['#fdf3ef', '#4d1b4a', '#d35f4e'],
    dark: ['#211220', '#ffcebd', '#bc4a3b'],
  },
  {
    slug: 'terracotta-and-teal',
    name: 'Terracotta & Teal',
    light: ['#f9f0e5', '#6a2107', '#0d9696'],
    dark: ['#241711', '#f6cfb0', '#027c7c'],
  },
];

export default palettes;
