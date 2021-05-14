const fs = require("fs");
var path = require("path");
let saveDb, NameWe;
const dataModeAuto = path.resolve(
  __dirname,
  "../modeAndDataAuto/mode.auto.json"
);

function saveMode(mode) {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  data.mode = mode;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  saveDb.set(data);
}
function saveAuto(auto) {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  data.autoData = auto;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  saveDb.set(data);
}
function statusEsp(esp, status, ip, SS, cpu, ram) {
  var obj = {};
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  if (parseInt(status) === 1) {
    obj.status = true;
  } else obj.status = false;
  obj.ip = ip;
  obj.SignalStrength = SS;
  obj.cpu = cpu;
  obj.ram = ram;
  data.statusEsp[esp] = obj;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  saveDb.set(data);
}
function setDevice(nameDevice, statusDevice){
  let data = JSON.parse(fs.readFileSync(dataModeAuto,'utf8'))
  data.statusDevice.Device[nameDevice] = statusDevice;
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto,array1);
  saveDb.set(data);
}

function addDevice(name) {
  const dataNew = {};
  let id = 0;
  let nameDevice = "";
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  for (item in data.statusDevice.Device) {
    id++;
  }
  if (id === 0) {
    nameDevice = "Device";
  } else nameDevice = "Device" + id;
  dataNew[nameDevice] = {
    id: id,
    name: name,
    status: 0,
  };
  data.statusDevice.Device = { ...data.statusDevice.Device, ...dataNew };

  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
  convert();
}
function remoteDevice(id) {
  let index = 0;
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  for (item in data.statusDevice.Device) {
    if (data.statusDevice.Device[item].id === id) {
      delete data.statusDevice.Device[item];
    }
  }
  for (item in data.statusDevice.Device) {
    let name = "";
    index++;
    console.log(index, data.statusDevice.Device, id);
    if (data.statusDevice.Device[item].id > id) {
      if (id == 0) {
        name = "Device";
        data.statusDevice.Device[name] = {
          id: index - 1,
          name: data.statusDevice.Device[item].name,
          status: data.statusDevice.Device[item].status,
        };
      } else {
        name = "Device" + index;
        data.statusDevice.Device[name] = {
          id: index,
          name: data.statusDevice.Device[item].name,
          status: data.statusDevice.Device[item].status,
        };
      }

      delete data.statusDevice.Device[item];
    }
  }
  //console.log(data.statusDevice.Device);
  // var array1 = JSON.stringify(data);
  // fs.writeFileSync(dataModeAuto, array1);
}

function getAll() {
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  return data;
}

function convert() {
  let obj = {};
  let data = JSON.parse(fs.readFileSync(dataModeAuto, "utf8"));
  data.dataSend = {};
  for (item in data.statusDevice.Device) {
    obj[item] = data.statusDevice.Device[item].status;
    data.dataSend = {
      ...data.dataSend,
      ...obj,
    };
  }
  var array1 = JSON.stringify(data);
  fs.writeFileSync(dataModeAuto, array1);
}

function saveAll(dataDB) {
  var array1 = JSON.stringify(dataDB);
  fs.writeFileSync(dataModeAuto, array1);
}

function pushDb(item) {
  saveDb = item;
}

function getnameSpaceWebapp(NameSpace) {
  NameSpace
}

module.exports = {
  saveMode,
  saveAuto,
  statusEsp,
  setDevice,
  getAll,
  saveAll,
  addDevice,
  remoteDevice,
  pushDb
};
