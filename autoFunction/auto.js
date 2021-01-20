const { saveMode,
  saveAuto,
  statusEsp,
  setDevice,
  getAll,
  saveAll, } = require("../saveData/modeAndDataAuto/create.mode");
const { getDataEsp } = require("../saveData/saveDataEsp/saveDataEsp");

const sendWebApp = (nameSpaceEspControll, nameSpaceWebapp) => {
  nameSpaceEspControll.emit("LED", getAll().statusDevice.Device);
  nameSpaceWebapp.emit("onMa1", getAll().statusDevice.Device);
};

function controllAutoDeviceByLux(nameSpaceEspControll, nameSpaceWebapp, nameDevice, nameDevice1) {
  if (getAll().autoData.setActiveAutoChild.MMLux === true) {
    if (
      getAll().autoData.setLux[0] < getDataEsp().espSensor.statusDevice.light &&
      getAll().statusDevice.Device[nameDevice] != 1
    ) {
      setDevice(nameDevice, 1); //2
      setDevice(nameDevice1, 0); //3
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
    if (
      getAll().autoData.setLux[1] > getDataEsp().espSensor.statusDevice.light &&
      getAll().statusDevice.Device[nameDevice] != 1
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
    if (
      getAll().autoData.setLux[0] > getDataEsp().espSensor.statusDevice.light &&
      getAll().autoData.setLux[1] < getDataEsp().espSensor.statusDevice.light &&
      (getAll().statusDevice.Device[nameDevice] != 0 ||
        getAll().statusDevice.Device[nameDevice] != 0)
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 0);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
  }
}

function controllAutoDeviceByTemp(nameSpaceEspControll, nameSpaceWebapp, nameDevice, nameDevice1) {
  if (getAll().autoData.setActiveAutoChild.MMTemp === true) {
    if (
      getAll().autoData.setTemp[0] < getDataEsp().espSensor.statusDevice.temp &&
      getAll().statusDevice.Device[nameDevice] != 1 && //4
      getAll().statusDevice.Device[nameDevice1] != 1
    ) {
      setDevice(nameDevice, 1);
      setDevice(nameDevice1, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
    if (
      getAll().autoData.setTemp[0] >= getDataEsp().espSensor.statusDevice.temp &&
      getAll().statusDevice.Device[nameDevice] != 0 && //4
      getAll().statusDevice.Device[nameDevice1] != 0
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 0);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
  }
}

function controllAutoDeviceByTime(nameSpaceEspControll, nameSpaceWebapp, timeUp, nameDevice) {
  if (getAll().autoData.setActiveAutoChild.thoigianbom === true) {
    if (
      timeUp <= getAll().autoData.setTimePump * 30 &&
      getAll().statusDevice.Device[nameDevice] != 1
    ) {
      setDevice(nameDevice, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    } else if (
      timeUp > getAll().autoData.setTimePump * 60 &&
      timeUp <= getAll().autoData.setTimePump * 120 &&
      getAll().statusDevice.Device[nameDevice] != 0
    ) {
      setDevice(nameDevice, 0);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
  }
}

module.exports = {
  controllAutoDeviceByLux,
  controllAutoDeviceByTime,
  controllAutoDeviceByTemp
};
