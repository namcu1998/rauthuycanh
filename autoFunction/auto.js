const { setDevice, getAll } = require("../data/clientData/clientData");
const { getDataAll } = require("../data/espData/saveDataEsp");

const sendWebApp = (nameSpaceEspControll, nameSpaceWebapp) => {
  nameSpaceEspControll.emit("LED", getAll().statusDevice);
};

function controllAutoDeviceByLux(
  nameSpaceEspControll,
  nameSpaceWebapp,
  nameDevice,
  nameDevice1
) {
  const lightClientData = [ getAll().autoData.setLux.active,
                            getAll().autoData.setLux.max,
                            getAll().autoData.setLux.min ];
                            
  const devices = getAll().statusDevice;
  const light = getDataAll().espData.espSensorData.sensorData.lightData.data;

  if (lightClientData[0] === true) {

    if ( lightClientData[1] < light && devices[nameDevice] != 1) {
      setDevice(nameDevice, 1);
      setDevice(nameDevice1, 0);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }

    if (lightClientData[2] > light && devices[nameDevice] != 0) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }

    if ( lightClientData[1] > light && lightClientData[2] < light && ( devices[nameDevice] != 0 || devices[nameDevice] != 0 )) {
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
  const tempClientData = [  getAll().autoData.setTemp.active,
                            getAll().autoData.setTemp.max,
                            getAll().autoData.setTemp.min ];

  const devices = getAll().statusDevice;
  const tempareture = getDataAll().espData.espSensorData.sensorData.temparetureInDoorData.data;

  if (tempClientData[0] === true) {
    if (
      tempClientData[1] < tempareture &&
      devices[nameDevice] != 1 &&
      devices[nameDevice1] != 1
    ) {
      setDevice(nameDevice, 1);
      setDevice(nameDevice1, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    }
    if (
      tempClientData[1] >= tempareture &&
      devices[nameDevice] != 0 &&
      devices[nameDevice1] != 0
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
  const pumpData = [  getAll().autoData.setTimePump.active,
                      getAll().autoData.setTimePump.time ];

  const devices = getAll().statusDevice;

  if (pumpData[0] === true) {
    
    if ( timeUp <= pumpData[1] * 30 && devices[nameDevice] != 1 ) {
      setDevice(nameDevice, 1);
      sendWebApp(nameSpaceEspControll, nameSpaceWebapp);
    } 

    else if ( timeUp > pumpData[1] * 60 && timeUp <= pumpData[1] * 120 && devices[nameDevice] != 0 ) {
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
