#!/opt/homebrew/bin/node

const node = require('./node');

node.on('generate', req => {
  node.reply(req, { type: 'generate_ok', id: crypto.randomUUID() });
});

node.main();

// save a test string here for future easy use
// {"src": "c1","dest": "n1","body": {"type": "generate","msg_id": 1}}
