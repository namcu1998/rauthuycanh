import { getAll, setDevice} from ('../modeAndDataAuto/create.mode');
function controllAutoDeviceByLux(array, indexLux, indexDevice,  nameDevice, nameDevice1, sendWebApp) {
  if (getAll().autoData.setActiveAutoChild.MMLux === true) {
    if (
      getAll().autoData.setLux[0] < array.espSensor[2] &&
      array.espControll[2] != 1 &&
      array.espControll.length > 0
    ) {
      setDevice(nameDevice, 1); //2
      setDevice(nameDevice1, 0); //3
      sendWebApp();
    }
    if (
      getAll().autoData.setLux[1] > array.espSensor[2] &&
      array.espControll[3] != 1 &&
      array.espControll.length > 0
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 1);
      sendWebApp();
    }
    if (
      getAll().autoData.setLux[0] > array.espSensor[2] &&
      getAll().autoData.setLux[1] < array.espSensor[2] &&
      (array.espControll[2] != 0 || array.espControll[3] != 0) &&
      array.espControll.length > 0
    ) {
      setDevice(nameDevice, 0);
      setDevice(nameDevice1, 0);
      sendWebApp();
    }
  }
}

function controllAutoDeviceByTime(array, nameDevice, nameDevice1, sendWebApp) {
  if (getAll().autoData.setActiveAutoChild.MMTemp === true) {
      if (
        getAll().autoData.setTemp[0] < array.espSensor[0] &&
        array.espControll[4] != 1 &&
        array.espControll[5] != 1 &&
        array.espControll.length > 0
      ) {
        setDevice(nameDevice, 1);
        setDevice(nameDevice1, 1);
        sendWebApp();
      }
      if (
        getAll().autoData.setTemp[0] >= array.espSensor[0] &&
        array.espControll[4] != 0 &&
        array.espControll[5] != 0 &&
        array.espControll.length > 0
      ) {
        setDevice(nameDevice, 0);
        setDevice(nameDevice1, 0);
        sendWebApp();
      }
    }
  }

module.export = {
  controllAutoDeviceByLux,
  controllAutoDeviceByTime
}