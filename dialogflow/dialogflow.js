const { setDevice } = require("../data/clientData/clientData");
const { getDataAll } = require("../data/espData/saveDataEsp");

module.exports = function (appdialogflow) {
  appdialogflow.intent("myIntent", (conv, { devicesname, statusdevice }) => {
    return new Promise((resolve, reject) => {
      console.log(devicesname, statusdevice);
      if (devicesname == "đèn" && statusdevice == "bật") {
        setDevice("Device6", 1);
      }
      if (devicesname == "đèn" && statusdevice == "tắt") {
        setDevice("Device6", 0);
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
  });

  appdialogflow.intent("sensor", (conv, { sensor }) => {
    if (sensor === "nhiệt độ") {
      console.log("done");
      conv.ask(
        `Nhiệt độ bên trong nhà rau tại thời điểm ${
          getDataAll().espData.espSensorData.sensorData.temparetureInDoorData
            .time
        } là ${
          getDataAll().espData.espSensorData.sensorData.temparetureInDoorData
            .data
        }ºC 
        \n 
        Nhiệt độ bên ngoài nhà rau là ${
          getDataAll().espData.espSensorData.sensorData.temparetureOutDoorData
            .data
        }ºC`
      );
    }

    if (sensor === "độ ẩm") {
      console.log("done");
      conv.ask(
        `Độ ẩm bên trong nhà rau tại thời điểm ${
          getDataAll().espData.espSensorData.sensorData.humidityInDoorData.time
        } là ${
          getDataAll().espData.espSensorData.sensorData.humidityInDoorData.data
        }% 
        \n 
        Độ ẩm bên ngoài nhà rau là ${
          getDataAll().espData.espSensorData.sensorData.humidityOutDoorData.data
        }%`
      );
    }
  });
};
