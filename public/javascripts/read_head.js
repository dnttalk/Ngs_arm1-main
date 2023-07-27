const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const M812 = '500000FFFF03000C001000010401002C0300900100';
const D844 = '500000FFFF03000C001000010400004C0300A80100';
const a = Buffer.from(M812, 'hex');
const b = Buffer.from(D844, 'hex');

const gunNames = ['1號槍頭', '2號槍頭', '3號槍頭', '4號槍頭', '5號槍頭', '6號槍頭', '7號槍頭', '8號槍頭'];

const client = net.connect(PORT, HOST, () => {
  console.log('已連接到伺服器');
  client.write(a);
  client.write(b);
});

client.on('data', (data) => {
  const receivedData = data.toString('hex');
  console.log('接收到的数据:', receivedData);

  // 判斷是否收到的是 b 資料的回應
  if (receivedData === b.toString('hex')) {
    // 獲取最後8個十六進位字符
    const last8Characters = receivedData.slice(-8);
    console.log('最後8碼:', last8Characters);

    // 將十六進位字符轉換為十進位數字
    const decimalNumber = parseInt(last8Characters, 16);

    // 判斷槍頭並輸出
    const gunHeads = [];
    for (let i = 0; i < gunNames.length; i++) {
      if ((decimalNumber >> i) & 1 === 1) {
        gunHeads.push(gunNames[i]);
      }
    }

    if (gunHeads.length > 0) {
      console.log('槍頭:', gunHeads.join(', '));
    } else {
      console.log('沒有槍頭');
    }
  }
});

client.on('end', () => {
  console.log('已與伺服器斷開連接');
});