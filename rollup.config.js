import commonjs from '@rollup/plugin-commonjs';
import react from 'react';
import reactDom from 'react-dom';

export default {
  input: 'src/index.js',
  output: {
    dir: 'storybook-static',
    format: 'cjs',
  },
  plugins: [
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
      },
    }),
  ],
};
