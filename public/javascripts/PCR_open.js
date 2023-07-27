const net = require('net'); // 引入 net 模組
const HOST = '192.168.1.101'; // 欲連線的設備的 IP 位址
const PORT = 8001; // 連接埠號
const hexData = '500000FFFF03000D0010000114010018020090010010';
const delayedHexData = '500000FFFF03000D001000011401001B020090010010'; // 第二組十六進制數據
const buffer = Buffer.from(hexData, 'hex'); // 第一組數據的緩衝區
const delayedBuffer = Buffer.from(delayedHexData, 'hex'); // 第二組數據的緩衝區

const sendDelayedData = () => {
  console.log(delayedBuffer);
  client.write(delayedBuffer); // 發送第二組數據
};

const client = net.connect(PORT, HOST, () => {
  console.log(buffer);
  client.write(buffer); // 發送第一組數據
  setTimeout(sendDelayedData, 1000); // 延遲 1 秒後發送第二組數據
});

client.on('close', () => {
  console.log('連線關閉');
});