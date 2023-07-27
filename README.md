# 一、搭建web應用

 使用Node.js搭建web伺服器，一般使用一些框架來幫助完成。

 **express** 是一個開源的node.js專案框架，初學者使用express可以快速的搭建一個Web專案，express中已經集成了Web的http伺服器創建、請求和檔管理以及Session的處理等功能，所以express是非常適合初學者的入門學習。

## 1. 安裝Express框架

> 使用node.js自帶的包管理器npm安裝。

1. 創建一個專案目錄，Node_Hello。進入該目錄，創建一個package.json檔，檔內容如下：

```
{
  "name": "Node_Hello",
  "description": "nodejs hello world app",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "4.x"
  }
}
```

上面代碼定義了項目的名稱、描述、版本等，並且指定需要4.0版本以上的Express。

1. **從控制台首先進入剛才的專案目錄**，然後輸入如下命令，則會開始下載Express。

```
npm install
```

![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-19/23566978.jpg)

下載完成

![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-19/3061746.jpg) 
![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-19/44088268.jpg)

## 2. 創建開機檔案

 在上面的專案目錄下，新建一個開機檔案，名字暫叫 **index.js** 。書寫如下代碼：

```
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('<h1>你好，這是我們的第一個nodejs項目</h1>');
});
app.listen(9999);
```

## 3. 運行index.js文件

```
node index.js1
```

## 4. 使用流覽器訪問

在流覽器輸入下面的位址就可以訪問我們剛剛搭建的web網站了。

```
http://127.0.0.1:9999
```

# 二、使用Webstorm搭建Node.js web應用

 使用webstorm搭建Node.js應用更加方便。

## 1. 下載WebStorm，並安裝

[官網下載Webstorm](https://www.jetbrains.com/webstorm/)

下載完成後，直接安裝即可。

## 2. 創建Node + Express應用

![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-20/50253248.jpg)

## 3. Project目錄結構

![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-20/4504409.jpg)

```
app.js：開機檔案，或者說入口檔

package.json：存儲著工程的資訊及模組依賴，當在 dependencies 中添加依賴的模組時，運行 npm install ，npm 會檢查目前的目錄下的 package.json，並自動安裝
所有指定的模組

node_modules：存放 package.json 中安裝的模組，當你在 package.json 添加依賴的模組並安裝後，存放在這個資料夾下

public：存放 image、css、js 等文件

routes：存放路由文件

views：存放視圖檔或者說模版檔

bin：存放可執行檔(www)
```

## 4. 各個主要檔的說明

### 4.1 app.js

```
//載入模組
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//載入路由檔
var index = require('./routes/index');
var users = require('./routes/users');

// 生產一個express的實例
var app = express();

// view engine setup
/*
設置 views 資料夾為存放視圖檔的目錄,
即存放範本檔的地方,__dirname 為全域變數,
存儲當前正在執行的腳本所在的目錄。
 */
app.set('views', path.join(__dirname, 'views'));
//設置範本引擎為ejs
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//載入日誌中介軟體
app.use(logger('dev'));
//載入解析json的中介軟體
app.use(bodyParser.json());
//載入解析urlencoded請求體的中介軟體。  post請求
app.use(bodyParser.urlencoded({extended: false}));
//載入解析cookie的中介軟體
app.use(cookieParser());
//設置public資料夾為放置靜態檔的目錄
app.use(express.static(path.join(__dirname, 'public')));

// 路由控制器。
app.use('/', index);  // http://localhost:3000
app.use('/users', users);   //http://localhost:3000/users


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//把app匯出。  別的地方就可以通過 require("app") 獲取到這個物件
module.exports = app;
```

### 4.2 bin/www

```
#!/usr/bin/env node //表明是node可執行檔

/**
 * Module dependencies.
 */
//引入我們在app.js中匯出的app模組
var app = require('../app');
//引入debuger模組，列印調試日誌
var debug = require('debug')('hello:server');
//引入http模組
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);  //設置埠號

/**
 * Create HTTP server.
 */
//創建Http伺服器
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
//監聽指定的埠
server.listen(port);
//監聽error事件。 onError是發生錯誤的時候的回呼函數
server.on('error', onError);
//監聽listening事件
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

### 4.3 routes/index.js

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Monster' });
});

module.exports = router;
/*
 生成一個路由實例用來捕獲訪問主頁的GET請求，
 匯出這個路由並在app.js中通過app.use('/', routes);
 載入。這樣，當訪問主頁時，就會調用res.render('index', { title: 'Monster' });
 渲染views/index.ejs模版並顯示到流覽器中。
 */
```

### 4.4 對路由寫法的優化

 在前面的**==app.js中==**，每個範本都有添加一次路由比較麻煩，其實應該把添加路由的事情專門交給index.js來做。也就是可以把多個路由放在一個路由檔中。

```
//載入路由檔
var index = require('./routes/index');  //去掉
var users = require('./routes/users');  //去掉
// 路由控制器。
app.use('/', index);  // http://localhost:3000  //去掉
app.use('/users', users);   //http://localhost:3000/users   //去掉
```

可以改成：

```
var routes = require('./routes/index');
routes(app);12
```

**index.js 文件優化成：** 這樣管理起來就方便很多

```
module.exports = function (app) {
  //一個get請求的路由  http://localhost:3000
  app.get("/", function (req, res) {
      res.render("index", {title:"Monsterabc"})
  });
  //又一個請求路由：http://localhost:3000/abc
  app.get("/abc", function (req, res) {
      res.render("index", {title:"Monster" + req.path})
  });
}
```

### 4.5 ejs範本

> 範本引擎（Template Engine）是一個將頁面範本和要顯示的資料結合起來生成 HTML 頁面的工具。如果說上面講到的 express 中的路由控制方法相當於 MVC 中的控制器的話，那範本引擎就相當於 MVC 中的視圖。
>
> 範本引擎的功能是將頁面範本和要顯示的資料結合起來生成 HTML 頁面。它既可以運 行在伺服器端又可以運行在用戶端，大多數時候它都在伺服器端直接被解析為 HTML，解析完成後再傳輸給用戶端，因此用戶端甚至無法判斷頁面是否是範本引擎生成的。有時候範本引擎也可以運行在用戶端，即流覽器中，典型的代表就是 XSLT，它以 XML 為輸入，在用戶端生成 HTML 頁面。但是由於流覽器相容性問題，XSLT 並不是很流行。目前的主流還是由伺服器運行範本引擎。
>
> 在 MVC 架構中，範本引擎包含在伺服器端。控制器得到使用者請求後，從模型獲取資料，調用範本引擎。範本引擎以資料和頁面範本為輸入，生成 HTML 頁面，然後返回給控制器，由控制器交回用戶端。
>
> **==ejs 是範本引擎的一種，它使用起來十分簡單，而且與 express 集成良好。==**
>
> 我們通過以下兩行代碼設置了範本檔的**存儲位置**和使用的**範本引擎**：(app.js檔中進行的設置)

```
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
```

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%- title %></p>
  </body>
</html>
```

> 說明：

ejs 的標籤系統非常簡單，它只有以下三種標籤：

- <% code %>：JavaScript 代碼。
- <%= code %>：顯示替換過 HTML 特殊字元的內容。(也就是說如果code中有標籤，則會原樣輸出，不會讓流覽器解析)
- <%- code %>：顯示原始 HTML 內容。(如果有a標籤，在流覽器端這則會看到一個超連結)

路由代碼：

```
router.get('/', function(req, res, next) {
  res.render('index', { title: "<a href='http://www.baidu.com'>百度 </a>"});
});

// 則會用title的值去替換ejs中的相應的代碼。
```

則生成的代碼：

```
<!DOCTYPE html>
<html>
  <head>
    <title>&lt;a href=&#39;http://www.baidu.com&#39;&gt;百度 &lt;/a&gt;</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1>&lt;a href=&#39;http://www.baidu.com&#39;&gt;百度 &lt;/a&gt;</h1>
    <p>Welcome to <a href='http://www.baidu.com'>百度 </a></p>
  </body>
</html>
```

# 三、使用上述搭建好的web伺服器創建一個登陸註冊的介面

## (一)、準備步驟

1. #### 先準備好要用到的資料,這裡我們把資料放到一個json檔中,如下:

   ```json
   [
     {
       "user": "Jack",
       "pwd": "111111"
     },
     {
       "user": "Mark",
       "pwd": "222222"
     },
     {
       "user": "Andy",
       "pwd": "333333"
     },
     {
       "user": "Joe",
       "pwd": "444444"
     },
     {
       "user": "Lucy",
       "pwd": "555555"
     }
   ]
   ```

   #### 2.再用HTML+CSS寫出一個登陸介面
```html
  <!DOCTYPE>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Login</title>
    <style>
        #login_div {
            margin: 120px auto;
            width: 380px;
            height: 300px;
            background: rgba(255, 255, 255, 0.2);
            background: url(images/img3.jpg) no-repeat center center;
            border-radius: 8px;
            box-shadow: 0 0 5px #000;
            text-align: center;
            font-family: "幼圓";
            color: #fff;
            text-shadow: 0 0 2px #000;
        }
        .login_input {
            width: 220px;
            height: 30px;
            font-size: 12px;
            border: 0;
            border-radius: 5px;
            margin-top: 10px;
            outline: none;
            position: relative;
            top: 20px;
            padding: 8px;
            color: #ff5000;
            font-weight: bolder;
        }
        #login_div>h2 {
            position: relative;
            top: 30px;
            color: #fff;
        }
        #login {
            width: 200px;
            height: 30px;
            border-radius: 5px;
            color: #fff;
            background: #ff5050;
            border: 0;
            padding: 0;
            cursor: pointer;
            position: relative;
            top: 30px;
        }
        #remember {
            width: 200px;
            height: 30px;
            border: 0;
            margin: auto;
            font-size: 12px;
            padding: 0;
            position: relative;
            top: 30px;
        }
        #remember p {
            margin-top: 5px;
            border: 0;
            padding: 0;
            line-height: 20px;
            height: 20px;
            width: 100px;
            float: left;
            text-shadow: 0 0 1px #333;
            position: relative;
            text-align: left;
            cursor: pointer;
        }
        #login_div a {
            text-shadow: 0 0 1px #000;
            font-size: 12px;
            width: 55px;
            height: 30px;
            position: relative;
            margin-left: 310px;
            margin-top: 70px;
            display: block;
            text-decoration: underline;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <form action="" method="post">
        <div id="login_div">
            <h2>登錄</h2>
            <input class="login_input" name="user" id="user" type="text" placeholder="請輸入用戶名" autofocus autocomplete="off" />
            <br/>
            <input class="login_input" name="pwd" id="pwd" type="password" placeholder="請輸入密碼" />
            <br/>
            <div id="remember">
                <p>
                    <input type="checkbox" style="vertical-align:-3px;" />記住密碼</p>
                <p style="left:0;text-align:right">忘記密碼?</p>
            </div>
            <input id="login" type="submit" value="登錄" />
            <a href="register.html">註冊帳號</a>
        </div>
    </form>
</body>
<script>
    var user = document.querySelector("#user")
    var pwd = document.querySelector('#pwd')
    var login = document.querySelector('#login')
    var form = document.querySelector('form')
    login.onclick = function (e) {
        if (user.value === '' || pwd.value === '') {
            e.preventDefault()
            alert("用戶名和密碼必填......")
        } else {
            form.action = '/users/login'
        }
    }
</script>
</html>
```

   #### 3.再用HTML+CSS寫出一個註冊介面

   ```HTML
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <style>
        #register_div {
            margin: 120px auto;
            width: 380px;
            height: 300px;
            background: rgba(255, 255, 255, 0.2);
            background: url(images/img3.jpg) no-repeat center center;
            border-radius: 8px;
            box-shadow: 0 0 5px #000;
            text-align: center;
            font-family: "幼圓";
            color: #fff;
            text-shadow: 0 0 2px #000;
        }
        .register_input {
            width: 220px;
            height: 30px;
            font-size: 12px;
            border: 0;
            border-radius: 5px;
            margin-top: 10px;
            outline: none;
            position: relative;
            top: 20px;
            color: #ff5000;
            font-weight: bolder;
            padding-left: 8px;
        }
        #register_div>h2 {
            position: relative;
            top: 30px;
            color: #fff;
        }
        #register {
            width: 200px;
            height: 30px;
            border-radius: 5px;
            color: #fff;
            background: #ff5050;
            border: 0;
            padding: 0;
            cursor: pointer;
            position: relative;
            top: 50px;
        }
    </style>
</head>
<body>
    <form action="" method="post">
        <div id="register_div">
            <h2>註冊</h2>
            <input class="register_input" name="user" id="user" type="text" autofocus placeholder="請輸入用戶名" autocomplete="off" />
            <br/>
            <input class="register_input" name="pwd" id="pwd" type="password" placeholder="請輸入密碼" />
            <br/>
            <input class="register_input" name="confirm" id="confirm" type="password" placeholder="請確認密碼" />
            <br/>
            <input id="register" type="submit" value="註冊" />
        </div>
    </form>
    <script>
        var user = document.querySelector('#user')
        var pwd = document.querySelector('#pwd')
        var confirm = document.querySelector('#confirm')
        var register = document.querySelector('#register')
        var form = document.querySelector('form')
        register.onclick = function (e) {
        if (user.value === '' || pwd.value === '') {
            e.preventDefault()
            alert("用戶名和密碼必填......")
        } else if(pwd.value !== confirm.value){
            e.preventDefault()
            pwd.value = ""
            confirm.value = ""
            alert("兩次填寫的密碼不一致......")
        } else{
            form.action = '/users/register'
        }
    }
    </script>
</body>
</html>
   ```

   > 準備工作做好後,我們開始寫核心的東西

   ## (二)、在 routes/users.js 中的操作

   #### 1.首先添加登陸校驗的功能

   ```javascript
   var express = require('express');
   var router = express.Router();
   const fs = require("fs");
   const path = require("path")
   /* GET users listing. */
   router.post('/login', function (req, res) {
       var user = req.body.user;
       var pwd = req.body.pwd;

       fs.readFile(path.join(__dirname, "../data/data.json"), "utf-8", function (error, data) {
           if (error) {
               res.send("<h1 style='color:orange'>! Server Error</h1>" + error);
               return;
           } else {
               let arr = JSON.parse(data);
               //遍歷數據 找出匹配的對象 返回用戶登錄成功
               for (let obj of arr) {
                   if (obj.user == user && obj.pwd == pwd) {
                       res.render('login_success', {user, title: 'Login success'});
                       return;
                   }
               }

               //遍歷數據 找出不匹配的對象  返回登錄失敗
               for (let obj of arr) {
                   if (obj.user != user && obj.pwd != pwd) {
                       res.send("<h1 style='color:red'>! Login fail</h1> userName&Password error" +
                           "<script>" +
                           "setTimeout(function(){window.location='/login.html'},3000)" +
                           "</script>" +
                           "<p>登陸失敗! 3秒後自動返回到登陸介面.....</p>");
                   } else if (obj.user != user) {
                       res.send("<h1 style='color:red'>! Login fail</h1> userName error" +
                           "<script>" +
                           "setTimeout(function(){window.location='/login.html'},3000)" +
                           "</script>" +
                           "<p>登陸失敗! 3秒後自動返回到登陸介面.....</p>");
                   } else {
                       res.send("<h1 style='color:red'>! Login fail</h1> Password error" +
                           "<script>" +
                           "setTimeout(function(){window.location='/login.html'},3000)" +
                           "</script>" +
                           "<p>登陸失敗! 3秒後自動返回到登陸介面.....</p>");
                   }
                   return;
               }
           }
       })
   });
   ```

   > 這裡要注意幾個點:
   >
   > 	1. 資料的路徑一定要寫對
   >
   > 	2. 最重要的一點就是,校驗的時候要先校驗是否匹配,然後再校驗錯誤的情況.		也就是登陸成功和登陸失敗,要分開來寫,而且還必須要遍歷兩次數據 .

2. #### 再添加註冊的功能

   ```javascript
   router.post('/register', function (req, res) {
       var user = req.body.user;
       var pwd = req.body.pwd;

       fs.readFile(path.join(__dirname, "../data/data.json"), "utf-8", function (error, data) {
           let arr = JSON.parse(data);

           //查詢數據庫中是否會有用戶註冊的數據  存在的話 提示用戶已存在
           for (let obj of arr) {
               if (obj.user == user) {
                   res.send("<h1 style='color:orange'>Register fail</h1>" +
                       "<script>" +
                       "setTimeout(function(){window.location='/register.html'},3000)" +
                       "</script>" +
                       "<p>已存在該用戶名! 3秒後自動返回到註冊頁面.....</p>");
                   return;
               }
           }

           //不存在的話 向用戶返回註冊成功 並將數據添加到數據庫
           var obj = {"user": user, "pwd": pwd}
           arr.push(obj);
           fs.writeFile("../data/data.json", JSON.stringify(arr), "utf-8", function (error) {
               res.send("<h1 style='color:orange'>Register success</h1>" +
                   "<script>" +
                   "setTimeout(function(){window.location='/login.html'},3000)" +
                   "</script>" +
                   "<p>註冊成功! 3秒後自動跳轉到登陸介面.....</p>");
               return;
           })
       })
   });
   ```

   ```tex
   	這裡要注意的是:判斷用戶是否存在,要和註冊成功之後將資料寫入分開來寫. 還有一點就是  JSON.stringify(arr) 的使用,就是將JavaScript物件轉換成Json資料,這點很重要,要不然資料庫中的資料將全是 [object Object].
   ```

   #### 3.還有最重要的一步

   ```javascript
   module.exports = router;  //傳送出模組可供請求的方法
   ```

   ## (三)、測試

   #### 1.登陸測試

   a.先運行bin/www.js檔,有兩種方法

   - webstorm 打開bin/www.js檔,點擊滑鼠右鍵,在選擇 Run'www' ,或者按快速鍵  Ctrl+Shift+F10.
   - 打開電腦終端 找到工程資料夾 輸入node www.js. 也可以運行www.js. 前提本文前面兩大點都完成了.

   b.然後打開流覽器,在位址欄輸入 http://127.0.0.1:8080/login.html 進入登陸介面.

   #### 2.註冊測試

   a.點擊登陸介面的 `註冊帳號`,進行註冊.

   b.註冊成功後,資料會直接插入到原本資料的後面

   ```Json
   [
     {
       "user": "Jack",
       "pwd": "111111"
     },
     {
       "user": "Mark",
       "pwd": "222222"
     },
     {
       "user": "Andy",
       "pwd": "333333"
     },
     {
       "user": "Joe",
       "pwd": "444444"
     },
     {
       "user": "Lucy",
       "pwd": "555555"
     },
     {
       "user": "Yc",
       "pwd": "250250"
     },
     {
       "user": "Lwp",
       "pwd": "123456"
     },
     {
       "user": "Yjr",
       "pwd": "777777"
     },
     {
       "user": "Ljj",
       "pwd": "888888"
     },
     {
       "user": "abc",
       "pwd": "123"
     }
   ]
   ```

   > 這就完成了一個通過後臺資料的登陸註冊介面.
