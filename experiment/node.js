#!/opt/homebrew/bin/node

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const handlers = {};

let nodeId = '';
let nodeIds = [];

const handleInit = req => {
  body = req.body;
  nodeId = body.node_id;
  nodeIds = body.node_ids;
  console.warn('Node', nodeId, 'initialized✅');
};

const send = (dest, body) => {
  const msg = { src: nodeId, dest: dest, body: body };
  console.warn('Sending', msg);
  console.log(JSON.stringify(msg));
};
exports.send = send;

const reply = (req, body) => {
  const body2 = { ...body, in_reply_to: req.body.msg_id };
  send(req.src, body2);
};
exports.reply = reply;

const handle = req => {
  const body = req.body;
  try {
    const type = body.type;
    if (type == 'init') {
      handleInit(req);
      reply(req, { type: 'init_ok' });
      return;
    }
    const handler = handlers[type];
    handler(req);
  } catch (err) {
    console.warn('Error processing request', err);
  }
};

exports.on = (type, handler) => {
  handlers[type] = handler;
};

exports.main = () => {
  rl.on('line', function (line) {
    console.warn('Got', line);
    handle(JSON.parse(line));
  });
};
