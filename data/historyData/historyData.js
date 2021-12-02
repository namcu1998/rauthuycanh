const fs = require("fs");
const path = require("path");
const time = require("../../time/time");
const { historyData } = require("../../database/firebase");
const dataHistory = path.resolve(__dirname, "../historyData/data.json");

function fileSave(sensorData, deviceData) {
  //Check json file not exist and not null
  if (fs.readFileSync(dataHistory, "utf8")) {
    //Read data from json file
    var data = JSON.parse(fs.readFileSync(dataHistory, "utf8"));
    //array length limit
    if (data.length > 100) {
      data.splice(100, 1);
    }
    //Add new data
    data.unshift(
      sensorData,
      deviceData,
      time: time.getTime()
    );
    //Send data to database
    historyData.set(data);
    //Write data in json file
    var data1 = JSON.stringify(data);
    fs.writeFileSync(dataHistory, data1);
  }

    let data1 = JSON.stringify(data);
    fs.writeFileSync(dataHistory, data1);
  }
}

function readFile() {
  let data = JSON.parse(fs.readFileSync(dataHistory, "utf8"));
  return data;
}

function getHistoryDataFromDatabase(data) {
  fs.writeFileSync(dataHistory, JSON.stringify(data));
}

module.exports = {
  getHistoryDataFromDatabase,
  fileSave,
  readFile,
};
