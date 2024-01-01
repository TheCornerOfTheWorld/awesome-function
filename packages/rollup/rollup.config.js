// import myExample from './rollup-plugin-my-example.js';
export default ({
  input: 'rollup-plugin-my-example.js',
  // plugins: [myExample()],
  output: [{
    file: 'rollup-plugin-example.js',
    format: 'cjs'
  }]
});