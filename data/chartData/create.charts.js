const fs = require("fs");
const path = require("path");
const dataChart = path.resolve(__dirname, "../chartData/dataCharts.json");
const { chartData } = require("../../database/firebase");
const numberOfElement = 10;

function pushDataChartOnDatabase(data) {
  chartData.set(data);
}

function writeDataIntoJson(name, value1, label, value2 = 0) {
  let jsonData = JSON.parse(fs.readFileSync(dataChart, "utf8"));
  let jsonDataCopy = [...jsonData];
  
  let element = jsonDataCopy.find(item => item.name === name);
  let index = jsonDataCopy.findIndex(item => item.name === name);
  
  element.labels.push(label);
  element.data1.push(value1);
  element.data2.push(value2);
  
  if (element.labels.length >= numberOfElement) {
    element.labels.shift();
    element.data1.shift();
    element.data2.shift();
  }
  
  jsonDataCopy[index] = element;
  
  pushDataChartOnDatabase(jsonDataCopy);

  let stringData = JSON.stringify(jsonDataCopy);
  fs.writeFileSync(dataChart, stringData);
  return [value1, label, value2];
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
	writeDataIntoJson
};
