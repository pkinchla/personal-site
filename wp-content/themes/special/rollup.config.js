import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

// `yarn build` -> `production` is true
// `yarn dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/js/main.js',
	output: {
		file: 'dist/js/main.js',
		format: 'esm',
		sourcemap: production ? false : true,
	},
	plugins: [
		resolve(),
		production && terser()
	]
};