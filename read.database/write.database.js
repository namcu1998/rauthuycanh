const fs  = require('fs')
let newId;
function fileSave(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year, speaker, fanHumi, fanTemp){
  var data = JSON.parse(fs.readFileSync('./JSON/data.json','utf8'))
  function Object(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year, speaker, fanHumi, fanTemp){
    this.nhietdo = nhietdo;
    this.doam = doam;
    this.light = light;
    this.thoigian = thing + " " + day + "/" + mouth + "/" + year + " " + hour + ":" + minute + ":" + second;
    this.fanHumi = fanHumi;
    this.speaker = speaker;
  }
  if(data.length > 100){
    data.splice(100,1);
  }
  data.unshift(new Object(nhietdo, doam, light, second, minute, hour, thing, day, mouth, year, speaker, fanHumi, fanTemp))
  var data1 = JSON.stringify(data);
  fs.writeFileSync('./JSON/data.json',data1);
}
 module.exports = fileSave