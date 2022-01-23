const net = require('net');
const fs = require('fs');

const [ username, filename, serverAddress, port ] = process.argv.slice(2);
const conn = net.createConnection({
  host: serverAddress || 'localhost',
  port: port || 3000,
});

conn.setEncoding('utf8');

conn.on('connect', () => {
  conn.write(`${username || 'a user'} has connected!`);
  conn.write(`Request ${filename}`);
});

conn.on('data', (data) => {
  console.log(data);
});