import {babel} from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

const config = {
  sourcemap: true,
};

const umdConfig = {
  ...config,
  name: 'BS5ReactElements',
  format: 'umd',
  globals: {
    'react': 'React',
    'bootstrap': 'bootstrap',
  },
};

const esmConfig = {
  ...config,
  format: 'esm',
};

const OUTPUT = 'dist/bs5-react-elements';

export default {
  input: 'src/lib/index.js',
  output: [
    {...umdConfig, file: `${OUTPUT}.js`},
    {...umdConfig, file: `${OUTPUT}.min.js`, plugins: [terser()]},
    {...esmConfig, file: `${OUTPUT}.esm.js`},
    {...esmConfig, file: `${OUTPUT}.esm.min.js`, plugins: [terser()]},
  ],
  external: ['bootstrap', 'react'],
  plugins: [babel({babelHelpers: 'bundled'})],
};
