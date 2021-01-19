const fs = require("fs");

function saveData(array) {
    let data = JSON.parse(fs.readFileSync("./db.json",'utf8'));
    data.length = 0;
    for(let i ; i < array.length ; i++) {
        data.push({
            id: i,
            nhietdo: array[i][0],
            doam: array[i][1],
            nhietdo1: array[i][2],
            nhietdo: array[i][0],
            nhietdo: array[i][0],
        })
    }
}