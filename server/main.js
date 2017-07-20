const webpack = require('webpack')
const express = require('express');
const path = require('path');
const opn = require('opn');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
const port = '8888';
const uri = 'http://localhost:' + port;

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
});

const app = express();

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

app.use('/', express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'index.html'));
});

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  opn(uri)
});

app.listen(port, function () {
	console.log('Listening on port 8888');
});