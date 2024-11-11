const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('build'));

const fs = require('fs');
const dataBuffer = fs.readFileSync('./build/JsonData/cctvData.json');
const dataJSON = dataBuffer.toString();
const dataList = JSON.parse(dataJSON);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(3000, () => {
    console.log("client start!");
});

app.get('/api/cctv', (req, res) => {
    res.json(dataList);
});

app.listen(4000, () => {
    console.log("server start!!");
});