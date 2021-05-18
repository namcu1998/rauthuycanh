const fs = require("fs");
const path = require("path");
const dataChart = path.resolve(__dirname, "../chartData/dataCharts.json");
const { chartData } = require("../../database/firebase");
const numberOfElement = 200;

function pushDataChartOnDatabase(data) {
  chartData.set(data);
}

function pushTemp(item, item1, item2) {
  let data1 = JSON.parse(fs.readFileSync(dataChart, "utf8"));
  if(data1.dataTemp.length > numberOfElement) {
	  data1.dataTemp.shift();
  }

  data1.dataTemp.push({
    nhietdo: item,
    thoigian: item1,
    nhietdoApi: item2,
  });

  pushDataChartOnDatabase(data1);

  let data2 = JSON.stringify(data1);
  fs.writeFileSync(dataChart, data2);
  return [item, item1, item2];
}

function pushHumi(item, item1, item2) {
  let data1 = JSON.parse(fs.readFileSync(dataChart, "utf8"));
  if(data1.dataHumi.length > numberOfElement) {
	data1.dataHumi.shift();
  }

  data1.dataHumi.push({
    doam: item,
    thoigian: item1,
    doamApi: item2
  });

  pushDataChartOnDatabase(data1);

  let data2 = JSON.stringify(data1);
  fs.writeFileSync(dataChart, data2);
  return [item, item1, item2];
}

function pushLux(item, item1) {
  let data1 = JSON.parse(fs.readFileSync(dataChart, "utf8"));
  if(data1.dataLux.length > numberOfElement) {
	data1.dataLux.shift();
  }

  data1.dataLux.push({
    anhsang: item,
    thoigian: item1,
  });

  pushDataChartOnDatabase(data1);

  let data2 = JSON.stringify(data1);
  fs.writeFileSync(dataChart, data2);
  return [item, item1];
}

function getDataChart() {
	return JSON.parse(fs.readFileSync(dataChart, "utf8"));
}

function getChartDataFromDatabase(data) {
  fs.writeFileSync(dataChart, JSON.stringify(data));
}

module.exports = {
  getChartDataFromDatabase,
  getDataChart,
	pushTemp,
	pushHumi,
	pushLux,
};
