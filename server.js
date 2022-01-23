const net = require('net');
const fs = require('fs');

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
      fs.readFile(`./share/${parameter}`, (err, data) => {
        client.write(`Fetching ${parameter}, standby...\n`);
        if (err) {
          client.write(`Unable to retrieve ${parameter}`);
          client.end();
          return;
        }
        client.write(`    === ${parameter} ===\n\n`);
        client.write(data);
        client.write('\n');
        client.end();
      });
    }
  });
});