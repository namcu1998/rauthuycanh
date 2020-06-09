const fs  = require('fs')
function fileSave(nhietdo, doam, thoigian, id){
    var data = JSON.parse(fs.readFileSync('data.json','utf8'))
    function Object(nhietdo, doam, thoigian, id){
    this.id = id;
    this.nhietdo = nhietdo;
    this.doam = doam;
    this.thoigian = thoigian;
    this.id = id;
    }
    if(data.length > 49){
      data.splice(49,1);
    }
    console.log(data.length)
    data.unshift(new Object(nhietdo, doam, thoigian, id))
    var data1 = JSON.stringify(data);
    fs.writeFileSync('data.json',data1);
    }
    module.exports = fileSave