const fs  = require('fs')
const db = require('../database/firebase')
function saveMode(mode){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[0] = mode;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(data)
}
function saveAuto(auto){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[1] = auto;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(data)
}
function fanHumi(fanHumi){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].fanHumi = fanHumi;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(data)
}
function speaker(speaker){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].speaker = speaker;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(data)
}
function fanTemp(fanTemp){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].fanTemp = fanTemp;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(data)
}
function fan(fan){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].fan = fan;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(data)
}
function statusEsp(esp){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[3] = esp;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(data)
}
function setUpload(upLoad){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].upload = upLoad;
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
module.exports.fanHumi = fanHumi;
module.exports.speaker = speaker;
module.exports.fanTemp = fanTemp;
module.exports.setUpload = setUpload;
module.exports.fan = fan;
module.exports.getAuto = getAuto;
module.exports.getMode = getMode;
module.exports.getAll = getAll;
module.exports.statusEsp = statusEsp;