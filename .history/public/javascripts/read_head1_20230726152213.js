const net = require('net');

const HOST = '192.168.1.101';
const M812 = '500000FFFF03000C001000010401002C0300900100';
const PORT = 8001;
const delayedHexData = '500000FFFF03000C001000010400004C0300A80100';
const a = Buffer.from(M812, 'hex');
const buffer = Buffer.from(delayedHexData, 'hex');

const gunNames = ['1號槍頭', '2號槍頭', '3號槍頭', '4號槍頭', '5號槍頭', '6號槍頭', '7號槍頭', '8號槍頭'];

const client = net.connect(PORT, HOST, () => {
  console.log('已連接到伺服器');
  client.write(a);

  // 使用 setInterval 來執行自動回傳100次，並在每次之間等待1秒
  let count = 0;
  const intervalId = setInterval(() => {
    client.write(buffer);
    count++;
    console.log(`第 ${count} 次回傳`);

    if (count === 100) {
      clearInterval(intervalId); // 停止自動回傳
      client.end(); // 關閉與伺服器的連接
      console.log('已自動回傳100次並與伺服器斷開連接');
    }
  }, 1000); // 1000毫秒 = 1秒
});

client.on('data', (data) => {
  const receivedData = data.toString('hex');
  console.log('1.接收到的数据:', receivedData);

  // 獲取最後8個十六進位字符
  const last8Characters = receivedData.slice(-8);
  console.log('最後8碼:', last8Characters);

  // 將十六進位字符轉換為二進位字符串
  const binaryString = (parseInt(last8Characters, 16)).toString(2).padStart(8, '0');

  // 判斷槍頭並輸出
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