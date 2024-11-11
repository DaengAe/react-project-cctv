const express = require('express');
const app = express();

const xlsx = require('xlsx');
const workbook = xlsx.readFile(__dirname + '../../../../JsonData/제주.xls');


const json = {};
let i = workbook.SheetNames.length;


while (i--) {
    const sheetname = workbook.SheetNames[i]; //지역(시트)명
    json[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
}


app.listen(9000, function(){
  console.log('listening on 9000')
})

app.get("/api/crwal/2", async(req, res)=>{

  res.send([{
    json,
  }]);
});