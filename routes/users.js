const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/login', (req, res) => {
  const { user, pwd } = req.body;
  const dataPath = path.join(__dirname, '../data/data.json');

  fs.readFile(dataPath, 'utf-8', (error, data) => {
    if (error) {
      res.send("<h1 style='color:orange'>! 伺服器錯誤</h1>" + error);
      return;
    }

    const arr = JSON.parse(data);
    const userObj = arr.find(obj => obj.user === user && obj.pwd === pwd);

    if (userObj) {
      res.render('first', { user, title: '登入成功' });
    } else {
      res.send(`<h1 style='color:red'>! 登入失敗</h1> 登入失敗！3秒後將自動返回登入介面.....<script>setTimeout(() => {window.location = '/login.html';}, 3000);</script>`);
    }
  });
});

const renderTemplate = (res, template) => {
  res.render(template);
};

router.get('/login', (req, res) => renderTemplate(res, 'second'));
router.get('/login', (req, res) => renderTemplate(res, 'mpn'));
router.get('/login', (req, res) => renderTemplate(res, 'first'));

module.exports = router;