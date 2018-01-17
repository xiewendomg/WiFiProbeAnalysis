var webpack = require('webpack');
var express = require('express');
var opn = require('opn');
var config = require('./webpack.config.hot');
var proxyMiddleware = require('http-proxy-middleware');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: true,  // 是否启用热更新
    historyApiFallback: true, // 所有的url路径均跳转到index.html,需要设置为true，否则比如访问localhost:8888,就跳转不到/home页
    inline: true, // 是否实时刷新，即代码有更改，自动刷新浏览器
    progress: true, // 在控制台输出webpack的编译进度
    stats: {
        colors: true // 不同类型的信息用不同的颜色显示
    }
}));

// 代理服务器
app.use('/shopro', proxyMiddleware({
    target: 'http://admin.sosout.co',
    changeOrigin: true
}));

app.use(require('webpack-hot-middleware')(compiler));

//将其他路由，全部返回index.html
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

var port = process.env.PORT || 8888;
/* 启动服务 */
app.listen(port, function() {
    console.log('成功开启'+ port +'端口');
    var uri = 'http://localhost:' + port;
    console.log('Listening at ' + uri + '\n');
    opn(uri);
});
