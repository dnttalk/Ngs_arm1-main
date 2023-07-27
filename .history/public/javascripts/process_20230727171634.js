const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const delayedHexData = '500000FFFF03000C00100001040000A00F00A80100';
const buffer = Buffer.from(delayedHexData, 'hex');

async function connectAndWriteToSocket() {
  return new Promise((resolve, reject) => {
    const client = net.connect(PORT, HOST, () => {
      console.log('已連接到伺服器');
      client.write(buffer);
    });

    client.on('data', (data) => {
      const receivedData = data.toString();
      console.log('1.接收到的数据:', data.toString('hex'));
    });

    client.on('end', () => {
      console.log('已與伺服器斷開連接');
      resolve(); // Resolve the promise when the connection is closed
    });

    client.on('error', (error) => {
      console.error('Error:', error);
      reject(error); // Reject the promise if there's an error during connection
    });
  });
}

// 使用 async/await 調用 async function，並處理可能的錯誤
(async () => {
  try {
    await connectAndWriteToSocket();
    console.log('成功發送資料。');
  } catch (error) {
    console.error('錯誤:', error);
  }
})();
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