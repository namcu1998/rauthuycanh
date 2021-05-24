const { setDevice, getAll } = require("../data/clientData/clientData");
const { getDataAll } = require("../data/espData/saveDataEsp");

const sendWebApp = (nameSpaceEspControll, nameSpaceWebapp) => {
  nameSpaceEspControll.emit("LED", getAll().statusDevice.Device);
};

function controllAutoDeviceByLux(
  nameSpaceEspControll,
  nameSpaceWebapp,
  nameDevice,
  nameDevice1
) {
  if (getAll().autoData.setLux.active === true) {
    if (
      getAll().autoData.setLux.max <
      getDataAll().espData.espSensorData.sensorData.lightData.data &&
      getAll().statusDevice.Device[nameDevice] != 1
    ) {
      setDevice(nameDevice, 1); //2
      setDevice(nameDevice1, 0); //3
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
    if (
      getAll().autoData.setLux.min >
      getDataAll().espData.espSensorData.sensorData.lightData.data &&
      getAll().statusDevice.Device[nameDevice] != 0
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
    if (
      getAll().autoData.setLux.max >
      getDataAll().espData.espSensorData.sensorData.lightData.data &&
      getAll().autoData.setLux.min <
      getDataAll().espData.espSensorData.sensorData.lightData.data &&
      (getAll().statusDevice.Device[nameDevice] != 0 ||
        getAll().statusDevice.Device[nameDevice] != 0)
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 0);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
  }
}

function controllAutoDeviceByTemp(
  nameSpaceEspControll,
  nameSpaceWebapp,
  nameDevice,
  nameDevice1
) {

  let tempareture = getDataAll().espData.espSensorData.sensorData.temparetureInDoorData.data;

  if (getAll().autoData.setTemp.active === true) {
    if (
      getAll().autoData.setTemp.max < tempareture &&
      getAll().statusDevice.Device[nameDevice] != 1 && //4
      getAll().statusDevice.Device[nameDevice1] != 1
    ) {
      setDevice(nameDevice, 1);
      setDevice(nameDevice1, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
    if (
      getAll().autoData.setTemp.max >=
      tempareture &&
      getAll().statusDevice.Device[nameDevice] != 0 && //4
      getAll().statusDevice.Device[nameDevice1] != 0
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 0);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
  }
}

function controllAutoDeviceByTime(
  nameSpaceEspControll,
  nameSpaceWebapp,
  timeUp,
  nameDevice
) {
  if (getAll().autoData.setTimePump.active === true) {
    if (
      timeUp <= getAll().autoData.setTimePump.time * 30 &&
      getAll().statusDevice.Device[nameDevice] != 1
    ) {
      setDevice(nameDevice, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    } else if (
      timeUp > getAll().autoData.setTimePump.time * 60 &&
      timeUp <= getAll().autoData.setTimePump.time * 120 &&
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
  controllAutoDeviceByTemp,
};
