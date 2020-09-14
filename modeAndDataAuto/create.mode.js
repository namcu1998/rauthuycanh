const fs  = require('fs')
const db = require('../database/firebase')
function saveMode(mode){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[0] = mode;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(getModeAutoDriver())
    console.log("mode1")
}
function saveAuto(auto){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[1] = auto;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(getModeAutoDriver())
    console.log("mode2")
}
function savePin(mode, auto, pin){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[0] = mode;
    data[1] = auto;
    data[2] = pin;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function saveIPAndSignalStrength(ip, SS){
    var obj = {};
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    obj.ip = ip;
    obj.SignalStrength = SS;
    data[5] = obj;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function fanHumi(fanHumi){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].fanHumi = fanHumi;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(getModeAutoDriver())
    console.log("mode3")
}
function speaker(speaker){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].speaker = speaker;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(getModeAutoDriver())
    console.log("mode4")
}
function fanTemp(fanTemp){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].fanTemp = fanTemp;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(getModeAutoDriver())
    console.log("mode5")
}
function fan(fan){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].fan = fan;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
    db.data1.push(getModeAutoDriver())
    console.log("mode6")
}
function statusEsp(esp){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[3] = esp;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function setUpload(upLoad){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].upload = upLoad;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function setMode(mode){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data[2].mode = mode;
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
function getModeAutoDriver(){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    return [data[0], data[1], data[2]];
}
module.exports.saveAuto = saveAuto;
module.exports.saveMode = saveMode;
module.exports.savePin = savePin;
module.exports.saveIPAndSignalStrength = saveIPAndSignalStrength;
module.exports.fanHumi = fanHumi;
module.exports.speaker = speaker;
module.exports.fanTemp = fanTemp;
module.exports.setUpload = setUpload;
module.exports.setMode = setMode;
module.exports.fan = fan;
module.exports.getAuto = getAuto;
module.exports.getMode = getMode;
module.exports.getAll = getAll;
module.exports.getModeAutoDriver = getModeAutoDriver;
module.exports.statusEsp = statusEsp;