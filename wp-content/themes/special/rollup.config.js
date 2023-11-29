import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

// eslint-disable-next-line no-undef
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/ts/main.ts',
  output: {
    file: 'dist/js/main.js',
    format: 'esm',
    sourcemap: production ? false : true,
  },
  plugins: [
    resolve(),
    production && terser(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};
