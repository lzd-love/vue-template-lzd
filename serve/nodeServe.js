/*
 * @Author: lzd
 * @Date: 2020-09-07 18:57:36
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-07 20:07:58
 * @Description: content description
 */
var express = require("express");
var app = express(); //使用nodejs自带的http、https模块
var https = require("https");
var http = require("http");
var fs = require("fs");
var path = require("path");
var proxy = require("http-proxy-middleware");
var cp = require("child_process");
var url = require("url");
var history = require("connect-history-api-fallback");

var privateKey = fs.readFileSync(path.join(__dirname, "./key/key.pem"), "utf8");
var certificate = fs.readFileSync(
  path.join(__dirname, "./key/key-cert.pem"),
  "utf8"
);
var credentials = { key: privateKey, cert: certificate };

app.use(
  history({
    rewrites: [
      {
        //访问路径含dist则继续访问
        from: /^\/static\/.*$/,
        to: function(context) {
          return context.parsedUrl.pathname;
        }
      },
      {
        //后缀为js|css 访问dist下相应文件
        from: /^\/.*[js|css]$/,
        to: function(context) {
          return "/static";
        }
      },
      {
        //访问路径不含dist则默认访问/dist/index.html
        from: /^\/.*$/,
        to: function(context) {
          return "/";
        }
      }
    ]
  })
);

app.use(express.static(path.join(__dirname, "../dist")));
app.use(
  "/api",
  proxy({
    // 代理跨域目标接口
    target: "https://192.168.0.146:24684",
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
      res.header("Access-Control-Allow-Origin", "*");
    }
    // 修改响应信息中的cookie域名
    //  cookieDomainRewrite: ''  // 可以为false，表示不修改
  })
);

app.post("/", function(req, res) {
  console.log("主页 POST 请求");
  res.send("Hello POST");
});

//创建http与HTTPS服务器
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
//可以分别设置http、https的访问端口号

var PORT = 8900;
var SSLPORT = 8901;
//创建http服务器

httpServer.listen(PORT, function() {
  console.log("HTTP Server is running on: http://localhost:%s", PORT);
});
//创建https服务器
httpsServer.listen(SSLPORT, function() {
  console.log("HTTPS Server is running on: https://localhost:%s", SSLPORT);
}); //可以根据请求判断是http还是https

cp.exec("start chrome https://127.0.0.1:8901/");
