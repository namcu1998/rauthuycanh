const fs = require("fs");
const path = require("path")
function saveData(array) {
    let arrayData = [];
    for(let i = 0  ; i < array.length ; i++) {
        arrayData.push({
            id: i,
            nhietdo: array[i][0],
            doam: array[i][1],
            nhietdo1: array[i][2],
            doam1: array[i][3],
            anhsang: array[i][4],
            thoigian: array[i][5],
            Device: array[i][6],
            Device1: array[i][7],
            Device2: array[i][8],
            Device3: array[i][9],
            Device4: array[i][10],
            Device5: array[i][11],
        })
    }
    let data1 = JSON.stringify(arrayData);
    fs.writeFileSync(path.resolve(__dirname, "../saveDataBase/db.json"), data1);
}

function checkData() {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, "../saveDataBase/db.json"),'utf8'));
}

module.exports = {
    saveData,
    checkData
}