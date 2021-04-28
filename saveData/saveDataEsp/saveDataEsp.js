const fs = require("fs");
var path = require("path");
var arrayDataLux = [];
var arrayDataTemp = [];
var arrayDataHumi = [];
var ketquatblight = 0;
var ketquatbnhietdo = 0;
var ketquatbdoam = 0;
const dataEsp = path.resolve(__dirname, "../saveDataEsp/dataEsp.json");
function saveDataEspSensor(item) {
  let data = JSON.parse(fs.readFileSync(dataEsp, "utf8"));
  if (arrayDataLux.length < 5) {
    arrayDataLux.push(item.light);
    arrayDataTemp.push(item.temp);
    arrayDataHumi.push(item.humi);
  } else {
    for (var i = 0; i < arrayDataLux.length; i++) {
      ketquatblight += arrayDataLux[i];
      ketquatbnhietdo += arrayDataTemp[i];
      ketquatbdoam += arrayDataHumi[i];
    }
    data.espSensor.statusDevice.temp = ketquatbnhietdo / arrayDataLux.length;
    data.espSensor.statusDevice.humi = ketquatbdoam / arrayDataHumi.length;
    data.espSensor.statusDevice.light = ketquatblight / arrayDataLux.length;
    arrayDataLux = [];
    arrayDataTemp = [];
    arrayDataHumi = [];
    ketquatblight = 0;
    ketquatbnhietdo = 0;
    ketquatbdoam = 0;
  }
  data.espSensor = {
    statusDevice: {
      temp: data.espSensor.statusDevice.temp,
      humi: data.espSensor.statusDevice.humi,
      light: data.espSensor.statusDevice.light,
      Device6: item.Device6,
    },
    statusSensor: {
      statusWater: item.statusWater,
      statusWater1: item.statusWater1,
      statusDHT: item.statusDHT,
      statusLux: item.statusLux,
    },
  };
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataEsp, array1);
}

function saveDataEspControll(item) {
  let data = JSON.parse(fs.readFileSync(dataEsp, "utf8"));
  data.espControll = {
    statusDevice: {
      Device: item.Device,
      Device1: item.Device1,
      Device2: item.Device2,
      Device3: item.Device3,
      Device4: item.Device4,
      Device5: item.Device5,
    },
  };
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataEsp, array1);
}

function error(item) {
  let data = JSON.parse(fs.readFileSync(dataEsp, "utf8"));
  data.espSensor.statusSensor = {
    statusWater: item.statusWater,
    statusWater1: item.statusWater1,
    statusDHT: item.statusDHT,
    statusLux: item.statusLux,
  };
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataEsp, array1);
}

function getDataEsp() {
  return JSON.parse(fs.readFileSync(dataEsp, "utf8"));
}

function saveDataApi(dataApi) {
  let data = JSON.parse(fs.readFileSync(dataEsp, "utf8"));
  data.api = dataApi;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataEsp, array1);
}
module.exports = {
  saveDataEspSensor,
  saveDataEspControll,
  getDataEsp,
  error,
  saveDataApi,
};
