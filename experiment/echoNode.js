#!/opt/homebrew/bin/node

// Create readline interface for input and output from the terminal
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const nodeId = 'n0';

const send = (dest, body) => {
  const msg = { src: nodeId, dest: dest, body: body };
  // console.warn('Sending', msg);
  console.log(JSON.stringify(msg));
};

const reply = (req, body) => {
  const body2 = { ...body, in_reply_to: req.body.msg_id };
  send(req.src, body2);
};

// Listen for lines of input from the terminal
rl.on('line', req => {
  parsedReq = JSON.parse(req);
  try {
    if (parsedReq.body.type === 'echo') {
      reply(parsedReq, { type: 'echo_ok', echo: parsedReq.body.echo });
    } else if (parsedReq.body.type === 'init') {
      reply(parsedReq, { type: 'init_ok' });
    }
  } catch (e) {
    console.error('Error parsing JSON input:', e.message);
  }
});
