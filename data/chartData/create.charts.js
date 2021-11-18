const fs = require("fs");
const path = require("path");
const dataChart = path.resolve(__dirname, "../chartData/dataCharts.json");
const { chartData } = require("../../database/firebase");
const numberOfElement = 200;

function pushDataChartOnDatabase(data) {
  chartData.set(data);
}

function writeDataIntoJson(name, value1, label, value2 = null) {
  let jsonData = JSON.parse(fs.readFileSync(dataChart, "utf8"));
  let jsonDataCopy = [...jsonData]
  
  let element = jsonDataCopy.filter(item => {
    
    if (item.name === name) {
      item["labels"] = [...item.labels, label];
      item["data1"] = [...item.data1, value1];
      item["data2"] = [...item.data2, value2];
      item.labels.length = numberOfElement;
      item.data1.length = numberOfElement;
      item.data2.length = numberOfElement;
    } 
    
    return item;
  })
  
  pushDataChartOnDatabase(element);

  let stringData = JSON.stringify(element);
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
