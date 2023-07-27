const net = require('net');
const { promisify } = require('util');

const HOST = '192.168.1.101';
const PORT = 8001;
const hexData = '500000FFFF03000D0010000114010018020090010010';
const delayedHexData = '500000FFFF03000C00100001040000A00F00A80100';

const connect = promisify(net.connect);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendData(client, data) {
  return new Promise((resolve, reject) => {
    client.write(Buffer.from(data, 'hex'), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function connectAndSendData() {
  try {
    const client = await connect(PORT, HOST);

    client.on('close', () => {
      console.log('連線關閉');
    });

    console.log(Buffer.from(hexData, 'hex'));
    await sendData(client, hexData);

    const receivedData = await new Promise(resolve => {
      client.once('data', (data) => {
        resolve(data.toString('hex'));
      });
    });

    console.log('接收到的数据:', receivedData);

    // 延遲 1 秒後發送第二組數據
    console.log(Buffer.from(delayedHexData, 'hex'));
    await delay(1000);
    await sendData(client, delayedHexData);

    client.end(); // 關閉連線
  } catch (error) {
    console.error('連線或傳送數據時發生錯誤:', error);
    throw error;
  }
}

// 使用 async/await 呼叫 API
async function main() {
  try {
    await connectAndSendData();
    // 可以在這裡繼續進行其他非同步操作...
  } catch (error) {
    // 處理錯誤
  }
}

// 執行 main 函式
main();