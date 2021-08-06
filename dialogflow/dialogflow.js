const { setDevice } = require("../data/clientData/clientData");
const { getDataAll } = require("../data/espData/saveDataEsp");

module.exports = function (appdialogflow) {
  appdialogflow.intent("myIntent", (conv, { devicesname, statusdevice }) => {
    return new Promise((resolve, reject) => {
      console.log(devicesname, statusdevice);
      if (devicesname == "light" && statusdevice == "turn on") {
        setDevice("Device6", 1);
      }
      if (devicesname == "light" && statusdevice == "turn off") {
        setDevice("Device6", 0);
      }
      if (devicesname == "fan" && statusdevice == "turn on") {
        setDevice("Device4", 1);
      }
      if (devicesname == "fan" && statusdevice == "turn off") {
        setDevice("Device4", 0);
      }
      if (devicesname == "pump of hydroponics" && statusdevice == "turn on") {
        setDevice("Device", 1);
      }
      if (devicesname == "pump of hydroponics" && statusdevice == "turn off") {
        setDevice("Device", 0);
      }
      if (devicesname == "misting" && statusdevice == "turn on") {
        setDevice("Device1", 1);
      }
      if (devicesname == "misting" && statusdevice == "turn off") {
        setDevice("Device1", 0);
      }
      if (devicesname == "curtain" && statusdevice == "open") {
        setDevice("Device3", 1);
        setDevice("Device2", 0);
      }
      if (devicesname == "curtain" && statusdevice == "close") {
        setDevice("Device3", 0);
        setDevice("Device2", 1);
      }
      if (devicesname == "pump" && statusdevice == "turn on") {
        setDevice("Device7", 1);
      }
      if (devicesname == "pump" && statusdevice == "turn off") {
        setDevice("Device7", 0);
      }
      if (devicesname == "cooling system" && statusdevice == "turn on") {
        setDevice("Device5", 1);
      }
      if (devicesname == "cooling system" && statusdevice == "turn off") {
        setDevice("Device5", 0);
      }
    });
  });

  appdialogflow.intent("sensor", (conv, { sensor }) => {
    if (sensor === "temperature") {
      console.log("done");
      conv.ask(
        `temperature inside the greenhouse at the time ${
          getDataAll().espData.espSensorData.sensorData.temparetureInDoorData
            .time
        } là ${
          getDataAll().espData.espSensorData.sensorData.temparetureInDoorData
            .data
        }ºC 
        \n 
        temperature outside the greenhouse is ${
          getDataAll().espData.espSensorData.sensorData.temparetureOutDoorData
            .data
        }ºC`
      );
    }

    if (sensor === "humidity") {
      console.log("done");
      conv.ask(
        `humidity inside the greenhouse at the time ${
          getDataAll().espData.espSensorData.sensorData.humidityInDoorData.time
        } là ${
          getDataAll().espData.espSensorData.sensorData.humidityInDoorData.data
        }% 
        \n 
        humidity outside the greenhouse is ${
          getDataAll().espData.espSensorData.sensorData.humidityOutDoorData.data
        }%`
      );
    }
  });
};
