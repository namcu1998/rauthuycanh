const { setDevice } = require("../saveData/modeAndDataAuto/create.mode");
const { getDataEsp } = require("../saveData/saveDataEsp/saveDataEsp");
module.exports = function (appdialogflow, nameSpaceWebapp) {
  appdialogflow.intent("myIntent", (conv, { devicesname, statusdevice }) => {
    console.log(devicesname, statusdevice);
    if (devicesname == "đèn" && statusdevice == "bật") {
      setDevice("Device6", 1);
      nameSpaceWebapp.emit("onMa1", getAll().statusDevice.Device);
    }
    if (devicesname == "đèn" && statusdevice == "tắt") {
      setDevice("Device6", 0);
      nameSpaceWebapp.emit("onMa1", getAll().statusDevice.Device);
    }
    if (devicesname == "quạt" && statusdevice == "bật") {
      setDevice("Device4", 1);
    }
    if (devicesname == "quạt" && statusdevice == "tắt") {
      setDevice("Device4", 0);
    }
    if (devicesname == "bơm thủy canh" && statusdevice == "bật") {
      setDevice("Device", 1);
    }
    if (devicesname == "bơm thủy canh" && statusdevice == "tắt") {
      setDevice("Device", 0);
    }
    if (devicesname == "phun sương" && statusdevice == "bật") {
      setDevice("Device1", 1);
    }
    if (devicesname == "phun sương" && statusdevice == "tắt") {
      setDevice("Device1", 0);
    }
    if (devicesname == "rèm" && statusdevice == "mở") {
      setDevice("Device3", 1);
      setDevice("Device2", 0);
    }
    if (devicesname == "rèm" && statusdevice == "đóng") {
      setDevice("Device3", 0);
      setDevice("Device2", 1);
    }
    if (devicesname == "bơm nước" && statusdevice == "bật") {
      setDevice("Device7", 1);
    }
    if (devicesname == "bơm nước" && statusdevice == "tắt") {
      setDevice("Device7", 0);
    }
    if (devicesname == "két nước" && statusdevice == "bật") {
      setDevice("Device5", 1);
    }
    if (devicesname == "két nước" && statusdevice == "tắt") {
      setDevice("Device5", 0);
    }
  });

  appdialogflow.intent("sensor", (conv, { sensor }) => {
    if (sensor === "nhiệt độ nhà rau") {
      conv.ask(
        `nhiệt độ nhà rau là ${getDataEsp().espSensor.statusDevice.temp} ºC`
      );
    }
    if (sensor === "độ ẩm nhà rau") {
      conv.ask(
        `độ ẩm nhà rau là ${getDataEsp().espSensor.statusDevice.humi} %`
      );
    }
    if (sensor === "nhiệt độ ngoài trời") {
      conv.ask(`nhiệt độ ngoài trời là ${getDataEsp().api.temp - 273.15} ºC`);
    }
    if (sensor === "độ ẩm ngoài trời") {
      conv.ask(`độ ẩm ngoài trời ${getDataEsp().api.humidity} %`);
    }
    if (sensor === "ánh sáng") {
      conv.ask(`ánh sáng ${getDataEsp().espSensor.statusDevice.light} lux`);
    }
  });
};
