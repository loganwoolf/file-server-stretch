const net = require('net');
const { manager } = require('./fileServer');

const port = 3000;
const server = net.createServer();

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on("connection", (client) => {
  console.log('New client connected!');
  client.write('Good evening, client.\n');

  client.setEncoding('utf8');

  client.on('data', (data) => {
    const [command, parameter] = data.toLowerCase().split(' ');
    console.log(`Client says: ${data}`);
    if (command === 'request') {
      client.write(`Fetching ${parameter}, standby...`);
    }
  });
});