const fs = require("fs");
const path = require("path");
const { clientData } = require("../../database/firebase");
let saveDb, nameSpaceWebapp;
const dataModeAuto = path.resolve(__dirname, "../clientData/clientData.json");

function saveAuto(auto) {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  data.autoData = auto;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  clientData.set(data);
}

function editAuto(name, active) {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  data.autoData[name].active = active;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  clientData.set(data);
}

function setDevice(nameDevice, statusDevice) {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  if (nameDevice === "Device3" && statusDevice === 1) {
    data.statusDevice.Device2 = 0;
  }
  if (nameDevice === "Device2" && statusDevice === 1) {
    data.statusDevice.Device3 = 0;
  }
  data.statusDevice[nameDevice] = statusDevice;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  clientData.set(data);
  nameSpaceWebapp.emit("feedbackDevice", data.statusDevice);
}

function getAll() {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  return data;
}

function saveAll(dataDB) {
  var array1 = JSON.stringify(dataDB);
  fs.writeFileSync(dataModeAuto, array1);
}

function pushDb(item) {
  saveDb = item;
}

function getnameSpaceWebapp(NameSpace) {
  nameSpaceWebapp = NameSpace;
}

function getClientDataFromDatabase(data) {
  fs.writeFileSync(dataModeAuto, JSON.stringify(data));
}

module.exports = {
  getClientDataFromDatabase,
  getnameSpaceWebapp,
  setDevice,
  saveAuto,
  editAuto,
  saveAll,
  getAll,
  pushDb,
};
