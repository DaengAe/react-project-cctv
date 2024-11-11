const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const fs = require('fs');
const dataBuffer = fs.readFileSync('../JsonData/cctvData.json');
const dataJSON = dataBuffer.toString();
const dataList = JSON.parse(dataJSON);

app.get('/api/cctv', (req, res) => {
    res.json(dataList);
});

app.listen(4000, () => {
    console.log("server start!!");
});