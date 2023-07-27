const net = require('net');

const HOST = '192.168.1.101';
const M812 = '500000FFFF03000C001000010401002C0300900100';
const PORT = 8001;
const delayedHexData = '500000FFFF03000C001000010400004C0300A80100';
const a = Buffer.from(M812, 'hex');
const buffer = Buffer.from(delayedHexData, 'hex');

const gunNames = ['1號槍頭', '2號槍頭', '3號槍頭', '4號槍頭', '5號槍頭', '6號槍頭', '7號槍頭', '8號槍頭'];

async function connectAndSendData() {
  return new Promise((resolve, reject) => {
    const client = net.connect(PORT, HOST, () => {
      console.log('已連接到伺服器');
      client.write(a);

      let count = 0;
      const intervalId = setInterval(() => {
        client.write(buffer);
        count++;
        console.log(`第 ${count} 次回傳`);

        if (count === 100) {
          clearInterval(intervalId);
          client.end();
          console.log('已自動回傳100次並與伺服器斷開連接');
          resolve(); // 完成 Promise
        }
      }, 1000);
    });

    client.on('data', (data) => {
      const receivedData = data.toString('hex');
      console.log('1.接收到的数据:', receivedData);

      const last8Characters = receivedData.slice(-8);
      console.log('最後8碼:', last8Characters);

      const binaryString = (parseInt(last8Characters, 16)).toString(2).padStart(8, '0');

      const gunHeads = [];
      for (let i = 0; i < binaryString.length; i++) {
        if (binaryString[i] === '1') {
          gunHeads.push(gunNames[i]);
        }
      }

      if (gunHeads.length > 0) {
        console.log('槍頭:', gunHeads.join(', '));
      } else {
        console.log('沒有槍頭');
      }
    });

    client.on('end', () => {
      console.log('已與伺服器斷開連接');
    });

    client.on('error', (err) => {
      console.error('Error:', err);
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