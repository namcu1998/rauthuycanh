const fs = require("fs");
const path = require("path");
const dataChart = path.resolve(__dirname, "../createDataCharts/dataCharts.json");
function pushTemp(item, item1, item2) {
  let data1 = JSON.parse(fs.readFileSync(dataChart, "utf8"));
  if(data1.dataTemp.length > 10) {
	  data1.dataTemp.shift();
  }if(data1.dataTemp.length > 10) {
	  data1.dataTemp.shift();
  }
  data1.dataTemp.push({
    nhietdo: item,
    thoigian: item1,
    nhietdoApi: item2 - 273.15,
  });
  let data2 = JSON.stringify(data1);
  fs.writeFileSync(dataChart, data2);
  return [item, item1, item2 - 273.15];
}
function pushHumi(item, item1, item2) {
  let data1 = JSON.parse(fs.readFileSync(dataChart, "utf8"));
  if(data1.dataHumi.length > 10) {
	data1.dataHumi.shift();
}
  data1.dataHumi.push({
    doam: item,
    thoigian: item1,
    doamApi: item2
  });
  let data2 = JSON.stringify(data1);
  fs.writeFileSync(dataChart, data2);
  return [item, item1, item2];
}
function pushLux(item, item1) {
  let data1 = JSON.parse(fs.readFileSync(dataChart, "utf8"));
  if(data1.dataLux.length > 10) {
	data1.dataLux.shift();
}
  data1.dataLux.push({
    anhsang: item,
    thoigian: item1,
  });
  let data2 = JSON.stringify(data1);
  fs.writeFileSync(dataChart, data2);
  return [item, item1];
}
function getDataChart() {
	return JSON.parse(fs.readFileSync(dataChart, "utf8"));
}

function saveDb(item) {
  let data2 = JSON.stringify(item);
  fs.writeFileSync(dataChart, data2);
}
module.exports = {
	pushTemp,
	pushHumi,
	pushLux,
  getDataChart,
  saveDb
};
