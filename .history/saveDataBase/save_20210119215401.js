const fs = require("fs");

function saveData(array) {
    let data = JSON.parse(fs.readFileSync(dataHistory,'utf8'))
}