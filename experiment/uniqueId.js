#!/opt/homebrew/bin/node

const node = require('./node');
const generatedId = 0;

node.on('generate', req => {
  generatedId++;
  console.log('new id: ', generatedId);
  node.reply(req, { type: 'generate_ok', id: generatedId });
});

node.main();
