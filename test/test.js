const test = require('ava');
const { rollup } = require('rollup');

const noExportNamedDefaultFrom = require('../dist/index.js');

test('test1', async t => {
  const options = {
    input: ['test/files/sample1.js', 'test/files/sample2.js'],
    plugins: [
      noExportNamedDefaultFrom()
    ]
  };

  const bundle = await rollup(options);
  const code = await bundle.generate({ format: 'es' });
  code.output.forEach((value) => console.log(`=== ${value.fileName} ===\n${value.code}\n`));

  t.pass();
})