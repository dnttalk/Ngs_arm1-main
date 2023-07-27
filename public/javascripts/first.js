document.getElementById('leukemiaBtn').addEventListener('click', function () {
    alert('您點擊了 Leukemia 按鈕');
});

document.getElementById('tp53Btn').addEventListener('click', function () {
    alert('您點擊了 TP53 按鈕');
});

document.getElementById('mpnBtn').addEventListener('click', function () {
    alert('您點擊了 MPN 按鈕');
});

// 'pcrUnloadBtn' 按鈕的事件監聽器
document.getElementById('pcrUnloadBtn').addEventListener('click', function () {
    alert('您點擊了 PCR 開蓋按鈕'); // 顯示警示訊息
    const pcrUnloadBtn = document.getElementById('pcrUnloadBtn'); // 取得按鈕元素
    const apiUrl = 'http://localhost:3000/api/start/open'; // API 伺服器位址
    fetch(apiUrl) // 發送 GET 請求到 API 伺服器
        .then(response => response.json()) // 解析回應為 JSON 格式
        .then(data => {
            console.log(data.message); // 將伺服器回應記錄到控制台
        })
        .catch(error => {
            console.error('錯誤:', error); // 將錯誤記錄到控制台
        });
});

// 'pcrloadBtn' 按鈕的事件監聽器
document.getElementById('pcrloadBtn').addEventListener('click', function () {
    alert('您點擊了 PCR 關蓋按鈕'); // 顯示警示訊息
    const pcrloadBtn = document.getElementById('pcrloadBtn'); // 取得按鈕元素
    const apiUrl = 'http://localhost:3000/api/start/close'; // API 伺服器位址
    fetch(apiUrl) // 發送 GET 請求到 API 伺服器
        .then(response => response.json()) // 解析回應為 JSON 格式
        .then(data => {
            console.log(data.message); // 將伺服器回應記錄到控制台
        })
        .catch(error => {
            console.error('錯誤:', error); // 將錯誤記錄到控制台
        });
});
// 'read' 按鈕的事件監聽器
document.getElementById('read').addEventListener('click', function () {
    alert('您點擊了 read 關蓋按鈕'); // 顯示警示訊息
    const read = document.getElementById('read'); // 取得按鈕元素
    const apiUrl = 'http://localhost:3000/api/start/read'; // API 伺服器位址
    fetch(apiUrl) // 發送 GET 請求到 API 伺服器
        .then(response => response.json()) // 解析回應為 JSON 格式
        .then(data => {
            console.log(data.message); // 將伺服器回應記錄到控制台
        })
        .catch(error => {
            console.error('錯誤:', error); // 將錯誤記錄到控制台
        });
});