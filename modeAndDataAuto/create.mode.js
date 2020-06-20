const fs  = require('fs')
function saveMode(mode){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[0] = mode;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function saveAuto(auto){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[1] = auto;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function getMode(){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    return data[0];
}
function getAuto(){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    return data[1];
}
function getAll(){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    return data;
}
module.exports.saveAuto = saveAuto;
module.exports.saveMode = saveMode;
module.exports.getAuto = getAuto;
module.exports.getMode = getMode;
module.exports.getAll = getAll;