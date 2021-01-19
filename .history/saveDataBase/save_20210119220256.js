const fs = require("fs");
const path = re
function saveData(array) {
    let data = JSON.parse(fs.readFileSync("../saveDataBase/db.json",'utf8'));
    data.length = 0;
    for(let i ; i < array.length ; i++) {
        data.push({
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
    let data1 = JSON.stringify(data);
    fs.writeFileSync("../saveDataBase/db.json", data1);
}

module.exports.saveData = saveData;