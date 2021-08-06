import commonjs from '@rollup/plugin-commonjs';
import React from 'react';
import ReactDom from 'react-dom';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(React),
        'react-dom': Object.keys(ReactDom),
      },
    }),
  ],
};
