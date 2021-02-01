const fs  = require('fs');
const path = require("path");
let newId;
const dataHistory = path.resolve(__dirname, "../read.database/data.json");
function Object(nhietdo, doam, nhietdo1, doam1, light, time, device, device1, device2, device3, device4, device5){
  this.nhietdo = nhietdo;
  this.doam = doam;
  this.nhietdo1 = nhietdo1;
  this.doam1 = doam1;
  this.anhsang = light;
  this.thoigian = time;
  this.device1 = device1;
  this.device = device;
  this.device2 = device2;
  this.device3 = device3;
  this.device4 = device4;
  this.device5 = device5;
}
function fileSave(nhietdo, doam, nhietdo1, doam1, light, time,  device, device1, device2, device3, device4, device5){
  if(fs.readFileSync(dataHistory,'utf8')) {
    var data = JSON.parse(fs.readFileSync(dataHistory,'utf8'))
    if(data.length > 100){
      data.splice(100,1);
    }
    data.unshift(new Object(nhietdo, doam, nhietdo1, doam1, light, time, device, device1, device2, device3, device4, device5));
    var data1 = JSON.stringify(data);
    fs.writeFileSync(dataHistory,data1);
  }
  else {
    let data = [];
    data.push(new Object(nhietdo, doam, nhietdo1, doam1, light,time , device, device1, device2, device3, device4, device5));
    let data1 = JSON.stringify(data);
    fs.writeFileSync(dataHistory,data1);
  }
}

function readFile(){
  let data = JSON.parse(fs.readFileSync(dataHistory,'utf8'))
  return data;
}

 module.exports = {
  fileSave,
  readFile
 }