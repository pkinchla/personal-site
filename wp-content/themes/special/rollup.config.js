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
  },
  plugins: [
    resolve(),
    production && terser(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};
