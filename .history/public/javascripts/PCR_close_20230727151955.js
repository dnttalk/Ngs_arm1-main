const net = require('net');

async function connectAndWriteToSocket() {
  const HOST = '192.168.1.101'; // IP address of the device you want to connect to
  const PORT = 8001; // Port number
  const hexData = '500000FFFF03000D0010000114010019020090010010';
  const buffer = Buffer.from(hexData, 'hex');

  return new Promise((resolve, reject) => {
    const client = net.connect(PORT, HOST, () => {
      console.log(buffer);
      client.write(buffer);
    });

    client.on('error', (error) => {
      reject(error);
    });

    client.on('close', () => {
      console.log('連線關閉');
      resolve();
    });
  });
}

// Call the async function and handle errors if any
connectAndWriteToSocket()
  .then(() => {
    console.log('Data sent successfully.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });