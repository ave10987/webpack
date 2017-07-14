const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'index.html'));
});

app.listen(8888, function () {
	console.log('Listening on port 8888');
});