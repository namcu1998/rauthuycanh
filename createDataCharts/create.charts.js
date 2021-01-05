const fs = require("fs");
const { loopback } = require("ip");
function pushTemp(item, item1) {
  let data1 = JSON.parse(fs.readFileSync("./JSON/dataCharts.json", "utf8"));
  if(data1.dataTemp.length > 10) {
	  data1.dataTemp.shift();
  }if(data1.dataTemp.length > 10) {
	  data1.dataTemp.shift();
  }
  data1.dataTemp.push({
    nhietdo: item,
    thoigian: item1
  });
  let data2 = JSON.stringify(data1);
  fs.writeFileSync("./JSON/dataCharts.json", data2);
  return [item, item1];
}
function pushHumi(item, item1) {
  let data1 = JSON.parse(fs.readFileSync("./JSON/dataCharts.json", "utf8"));
  if(data1.dataHumi.length > 10) {
	data1.dataHumi.shift();
}
  data1.dataHumi.push({
    doam: item,
    thoigian: item1,
  });
  let data2 = JSON.stringify(data1);
  fs.writeFileSync("./JSON/dataCharts.json", data2);
  return [item, item1];
}
function pushLux(item, item1) {
  let data1 = JSON.parse(fs.readFileSync("./JSON/dataCharts.json", "utf8"));
  if(data1.dataLux.length > 10) {
	data1.dataLux.shift();
}
  data1.dataLux.push({
    anhsang: item,
    thoigian: item1,
  });
  let data2 = JSON.stringify(data1);
  fs.writeFileSync("./JSON/dataCharts.json", data2);
  return [item, item1];
}
function getDataChart() {
	return JSON.parse(fs.readFileSync("./JSON/dataCharts.json", "utf8"));
}

function saveDb(item) {
  let data2 = JSON.stringify(item);
  fs.writeFileSync("./JSON/dataCharts.json", data2);
}
module.exports = {
	pushTemp,
	pushHumi,
	pushLux,
  getDataChart,
  saveDb
}
