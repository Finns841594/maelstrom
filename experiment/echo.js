#!/opt/homebrew/bin/node

const node = require('./node');

node.on('echo', req => {
  node.reply(req, { type: 'echo_ok', echo: req.body.echo });
});

node.main();
