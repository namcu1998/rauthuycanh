const fs  = require('fs')
const db = require('../database/firebase')
function saveMode(mode){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data.mode = mode;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function saveAuto(auto){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data.autoData = auto;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function statusEsp(esp, status, ip, SS, cpu, ram){
    var obj = {};
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    if(parseInt(status) === 1) {
        obj.status = true;
    }
    else obj.status = false;
    obj.ip = ip;
    obj.SignalStrength = SS;
    obj.cpu = cpu;
    obj.ram = ram;
    data.statusEsp[esp] = obj;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function setDevice (nameDevice, statusDevice){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    data.statusDevice.Device[nameDevice] = statusDevice;
    var array1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/mode.auto.json',array1);
}
function getAll(){
    let data = JSON.parse(fs.readFileSync('./JSON/mode.auto.json','utf8'))
    return data;
}
module.exports = {
    saveMode,
    saveAuto,
    statusEsp,
    setDevice,
    getAll,
}