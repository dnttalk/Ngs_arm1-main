const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const hexData = '500000FFFF03000D0010000114010018020090010010';
const delayedHexData = '500000FFFF03000D001000011401001B020090010010';
const buffer = Buffer.from(hexData, 'hex');
const delayedBuffer = Buffer.from(delayedHexData, 'hex');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function connectAndSendData() {
  const client = net.connect(PORT, HOST);

  client.on('close', () => {
    console.log('連線關閉');
  });

  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      console.log(buffer);
      client.write(buffer); // 發送第一組數據

      client.on('data', (data) => {
        const receivedData = data.toString('hex');
        console.log('接收到的数据:', receivedData);

        // 延遲 1 秒後發送第二組數據
        delay(1000)
          .then(() => {
            console.log(delayedBuffer);
            client.write(delayedBuffer); // 發送第二組數據
            resolve(); // 完成 Promise
          })
          .catch(error => {
            console.error('延遲發送第二組數據時發生錯誤:', error);
            reject(error); // 拒絕 Promise 並回傳錯誤
          });
      });
    });

    client.on('error', (err) => {
      console.error('連線錯誤:', err);
      reject(err); // 拒絕 Promise 並回傳錯誤
    });
  });
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