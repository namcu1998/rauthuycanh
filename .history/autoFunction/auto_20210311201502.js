const { saveMode,
  saveAuto,
  statusEsp,
  setDevice,
  getAll,
  saveAll, } = require("../saveData/modeAndDataAuto/create.mode");
const { getDataEsp } = require("../saveData/saveDataEsp/saveDataEsp");

const sendWebApp = (nameSpaceEspControll, nameSpaceWebapp) => {
  nameSpaceEspControll.emit("LED", getAll().statusDevice.Device);
  nameSpaceWebapp.emit("feedbackDevice", getAll().statusDevice.Device);
};

function controllAutoDeviceByLux(nameSpaceEspControll, nameSpaceWebapp, nameDevice, nameDevice1) {
  if (getAll().autoData.setLux.active === true) {
    if (
      getAll().autoData.setLux.max < getDataEsp().espSensor.statusDevice.light &&
      getAll().statusDevice.Device[nameDevice] != 1
    ) {
      setDevice(nameDevice, 1); //2
      setDevice(nameDevice1, 0); //3
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
      console.log(1)
    }
    if (
      getAll().autoData.setLux.min > getDataEsp().espSensor.statusDevice.light &&
      getAll().statusDevice.Device[nameDevice] != 0
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
      console.log(2)
    }
    if (
      getAll().autoData.setLux.max > getDataEsp().espSensor.statusDevice.light &&
      getAll().autoData.setLux.min < getDataEsp().espSensor.statusDevice.light &&
      (getAll().statusDevice.Device[nameDevice] != 0 ||
        getAll().statusDevice.Device[nameDevice] != 0)
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 0);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
      console.log(3)
    }
  }
}

function controllAutoDeviceByTemp(nameSpaceEspControll, nameSpaceWebapp, nameDevice, nameDevice1) {
  if (getAll().autoData.setTemp.active === true) {
    if (
      getAll().autoData.setTemp.max < getDataEsp().espSensor.statusDevice.temp &&
      getAll().statusDevice.Device[nameDevice] != 1 && //4
      getAll().statusDevice.Device[nameDevice1] != 1
    ) {
      setDevice(nameDevice, 1);
      setDevice(nameDevice1, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
      console.log(4)
    }
    if (
      getAll().autoData.setTemp.max >= getDataEsp().espSensor.statusDevice.temp &&
      getAll().statusDevice.Device[nameDevice] != 0 && //4
      getAll().statusDevice.Device[nameDevice1] != 0
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 0);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
      console.log(5)
    }
  }
}

function controllAutoDeviceByTime(nameSpaceEspControll, nameSpaceWebapp, timeUp, nameDevice) {
  if (getAll().autoData.setTimePump.active === true) {
    if (
      timeUp <= getAll().autoData.setTimePump.time * 30 &&
      getAll().statusDevice.Device[nameDevice] != 1
    ) {
      setDevice(nameDevice, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
      console.log(6)
    } else if (
      timeUp > getAll().autoData.setTimePump.time * 60 &&
      timeUp <= getAll().autoData.setTimePump.time * 120 &&
      getAll().statusDevice.Device[nameDevice] != 0
    ) {
      setDevice(nameDevice, 0);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
      console.log(7)
    }
  }
}

module.exports = {
  controllAutoDeviceByLux,
  controllAutoDeviceByTime,
  controllAutoDeviceByTemp
};
