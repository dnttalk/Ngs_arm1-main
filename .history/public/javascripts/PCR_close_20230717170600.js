const net = require('net');
const HOST = '192.168.1.101'; // IP address of the device you want to connect to
const PORT = 8001; // Port number
const hexData = '500000FFFF03000D0010000114010019020090010010';
// Create hex command
const buffer = Buffer.from(hexData, 'hex');
// Connect to the remote device
const client = net.connect(PORT, HOST, () => {
  console.log(buffer);
  client.write(buffer);
});

// client.on('close', () => {
//   console.log('連線關閉');
// });
