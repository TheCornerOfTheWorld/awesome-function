import myExample from './rollup-plugin-my-example.js';
export default ({
  input: 'main.js',
  plugins: [myExample()],
  output: [{
    file: 'bundle.js',
    format: 'es'
  }]
});