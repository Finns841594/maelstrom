#!/opt/homebrew/bin/node

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// A map of request message types to functions which handle them.
const handlers = {};

let nodeId = '';
let nodeIds = [];

// Handle an init request
function handleInit(req) {
  body = req.body;
  nodeId = body.node_id;
  nodeIds = body.node_ids;
  console.warn('Node', nodeId, 'initialized');
}

// Send a message body to the given node.
function send(dest, body) {
  let msg = { src: nodeId, dest: dest, body: body };
  console.warn('Sending', msg);
  console.log(JSON.stringify(msg));
}
exports.send = send;

// Reply to a request with a given response body.
function reply(req, body) {
  if (req.body.msg_id == undefined) {
    throw {
      code: 13,
      text: "Can't reply to request without message id: " + JSON.stringify(req),
    };
  }
  let body2 = { ...body, in_reply_to: req.body.msg_id };
  send(req.src, body2);
}
exports.reply = reply;

// Handle a request
function handle(req) {
  try {
    let type = body.type;
    if (type == 'init') {
      handleInit(req);
      reply(req, { type: 'init_ok' });
    }

    handler(req);
  } catch (err) {
    console.warn('Error processing request', err);
  }
}

// Register a handler for a given message type.
exports.on = function (type, handler) {
  handlers[type] = handler;
};

exports.main = function () {
  rl.on('line', function (line) {
    console.warn('Got', line);
    handle(JSON.parse(line));
  });
};
