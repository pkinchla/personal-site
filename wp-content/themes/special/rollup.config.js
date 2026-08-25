import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

// eslint-disable-next-line no-undef
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/ts/main.ts',
  output: {
    dir: 'dist/js',
    format: 'esm',
    sourcemap: production ? false : true,
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-[hash].js',
    // Keep shared runtime helpers (e.g. tslib's __awaiter, pulled in by any
    // async/await that TS downlevels for the es2016 target) out of the entry
    // chunk. WordPress cache-busts the entry's own <script src> with a
    // "?v=" query string in dev (see special_scripts() in functions.php),
    // but internal ESM imports between generated chunks never carry that
    // query string. A lazy-loaded chunk that imported the helper straight
    // from './main.js' would resolve to a URL the browser hadn't already
    // loaded, re-evaluating main.js — and everything in it — a second time.
    // Giving the helper its own chunk means nothing ever imports from the
    // entry file itself.
    manualChunks(id) {
      if (id.includes('tslib')) return 'tslib';
    },
  },
  plugins: [
    resolve(),
    production && terser(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};
