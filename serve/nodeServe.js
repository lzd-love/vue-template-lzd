/*
 * @Author: lzd
 * @Date: 2020-09-07 11:16:00
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-07 13:51:01
 * @Description: content description
 */
var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var cp  = require('child_process')

//创建服务器
http.createServer(function (req, res) {
    //得到地址
    console.log(url.parse(req.url))
    var pathname = url.parse(req.url).pathname;
    //判断是文件地址还是文件夹地址，如果是文件夹地址那么自动请求文件夹中的index.html
    // if(pathname.indexOf(".") == -1){
    //     pathname += "/index.html";
    // }
    var fileURL = ".."+ (pathname.indexOf('dist')>-1?'':'/dist') + pathname;
    //得到拓展名
    var extname = path.extname(fileURL);
    fileURL = fileURL.indexOf('static')>-1?fileURL:'../dist/index.html';
    // console.log(fileURL)
    //把文件读出来
    fs.readFile(path.join(__dirname, fileURL), function(err, data){
        if(err){
            //文件不存在
            res.writeHead(404, {"Content-Type":"text/html;charset=UTF8"});
            res.end("404!页面没有找到！~");
        }
        var mime = getMime(fileURL.indexOf('static')>-1?extname:'.html', function (mime) {
            res.writeHead(200, {"Content-Type":mime});
            res.end(data);
        });
    });
}).listen(9080, "127.0.0.1");

cp.exec('start chrome 127.0.0.1:9080/')
function getMime(extname, callback) {
    //读取文件
    fs.readFile(path.join(__dirname, "./mime.json"), function (err, data) {
        if(err){
            throw Error("找不到mime.json文件");
        }
        //转成JSON
        var mimeJSON = JSON.parse(data);
        var mime = mimeJSON[extname] || "text/plain";
        callback(mime);
    });
}





