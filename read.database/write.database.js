const fs  = require('fs');
const { dulieuDb } = require('../database/firebase');
let newId;
function Object(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year, device, device1, device2, device3, device4, device5){
  this.nhietdo = nhietdo;
  this.doam = doam;
  this.light = light;
  this.thoigian = thing + " " + day + "/" + mouth + "/" + year + " " + hour + ":" + minute + ":" + second;
  this.device1 = device1;
  this.device = device;
  this.device2 = device2;
  this.device3 = device3;
  this.device4 = device4;
  this.device5 = device5;
}
function fileSave(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year, device, device1, device2, device3, device4, device5){
  dulieuDb.push([[nhietdo, doam, light, thoigian, device, device1, device2, device3, device4, device5]]);
  if(fs.readFileSync('./JSON/data.json','utf8')) {
    var data = JSON.parse(fs.readFileSync('./JSON/data.json','utf8'))
    if(data.length > 100){
      data.splice(100,1);
    }
    data.unshift(new Object(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year, device, device1, device2, device3, device4, device5));
    var data1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/data.json',data1);
  }
  else {
    let data = [];
    data.push(new Object(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year, device, device1, device2));
    let data1 = JSON.stringify(data);
    fs.writeFileSync('./JSON/data.json',data1);
  }
}
 module.exports = fileSave