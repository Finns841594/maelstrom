#!/opt/homebrew/bin/node

const node = require('./node');

const peers = [];
const messages = new Set();

// an example of topology message
// {
//   "type": "topology",
//   "topology": {
//     "n1": ["n2", "n3"],
//     "n2": ["n1"],
//     "n3": ["n1"]
//   }
// }

node.on('topology', req => {
  peers = req.body.topology[node.nodeId()];
  console.warn('My peers are', peers);
  node.reply(req, { type: 'topology_ok' });
});
