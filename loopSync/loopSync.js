const { getDataAll } = require("../data/espData/saveDataEsp");
const { getAll } = require("../data/clientData/clientData");
const getDataApiAsync = require("../api/api");
const time = require("../time/time");

const { controllAutoDeviceByLux,
        controllAutoDeviceByTime,
        controllAutoDeviceByTemp } = require("../autoFunction/auto");

let timeConnect = 0,
    timeUp = 0;

function pingEsp(nameSpaceEspControll, nameSpaceEspSensor) {
  if (timeConnect === 2) {
    nameSpaceEspControll.emit("ping", "nam");
    nameSpaceEspSensor.emit("ping", "nam");
    timeConnect = 0;
  } 
  else if (timeUp >= getAll().autoData.setTimePump.time * 120) timeUp = 0;
}

function pushDataBase() {
  if ((parseInt(time.time().split(":")[1]) === 0 || parseInt(time.time().split(":")[1]) % 15 === 0) && time.timeSecond() == 00 && getAll().statusEsp.espSensor.status === true) {

    dulieuDb.push([
      getDataEsp().espSensor.statusDevice.temp,
      getDataEsp().espSensor.statusDevice.humi,
      getDataEsp().api.temp,
      getDataEsp().api.humidity,
      getDataEsp().espSensor.statusDevice.light,
      time.getTime(),
      getAll().statusDevice.Device.Device,
      getAll().statusDevice.Device.Device1,
      getAll().statusDevice.Device.Device2,
      getAll().statusDevice.Device.Device3,
      getAll().statusDevice.Device.Device4,
      getAll().statusDevice.Device.Device5,
    ]);
  }
}

function timeGetApi() {
  if (getDataAll().api.temp === undefined) {
    getDataApiAsync();
  }
  if (time.timeDay()[1][1] === 0 || time.timeDay()[1][1] % 2 === 0) {
    getDataApiAsync();
  }
}

module.exports = function loopSync(
  nameSpaceEspControll,
  nameSpaceEspSensor,
  nameSpaceWebapp
) {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      timeConnect++;
      timeUp++;
      controllAutoDeviceByTemp(nameSpaceEspControll, nameSpaceWebapp, "Device4", "Device5")
      controllAutoDeviceByLux(nameSpaceEspControll, nameSpaceWebapp, "Device2", "Device3")
      controllAutoDeviceByTime(nameSpaceEspControll, nameSpaceWebapp, timeUp, "Device")
      pingEsp(nameSpaceEspControll, nameSpaceEspSensor);
      timeGetApi(); 
    }, 1000);
  });
};
