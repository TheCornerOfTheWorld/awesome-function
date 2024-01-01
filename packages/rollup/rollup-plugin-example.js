'use strict';

function myExample() {
  return {
    name: 'my-example', // this name will show up in logs and errors
    transform(code) {
      return `// 啦啦啦\n${code}`
    },
    load(...args) {
      console.log('id', args);
      // if (id === 'virtual-module') {
      //   // the source code for "virtual-module"
      //   return 'export default "This is virtual!"';
      // }
      return null; // other ids should be handled as usually
    }
  };
}

module.exports = myExample;
