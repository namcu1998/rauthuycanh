const fs  = require('fs')
let newId;
function fileSave(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year){
  var data = JSON.parse(fs.readFileSync('data.json','utf8'))
  function Object(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year){
    this.nhietdo = nhietdo;
    this.doam = doam;
    this.light = light;
    this.thoigian = thing + " " + day + "/" + mouth + "/" + year + " " + hour + ":" + minute + ":" + second;
  }
  if(data.length > 49){
    data.splice(49,1);
  }
  console.log(data.length)
  data.unshift(new Object(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year))
  var data1 = JSON.stringify(data);
  fs.writeFileSync('data.json',data1);
  }
 module.exports = fileSave