const fs = require("fs");
function pushTemp(item, item1) {
  let data1 = JSON.parse(fs.readFileSync("./JSON/dataCharts.json", "utf8"));
  data1.dataTemp.push({
    nhietdo: item,
    thoigian: item1,
  });
  let data2 = JSON.stringify(data1);
  fs.writeFileSync("db.json", data2);
  return [item, item1];
}
function pushHumi(item, item1) {
  let data1 = JSON.parse(fs.readFileSync("./JSON/dataCharts.json", "utf8"));
  data1.dataHumi.push({
    doam: item,
    thoigian: item1,
  });
  let data2 = JSON.stringify(data1);
  fs.writeFileSync("../JSON/dataCharts.json", data2);
  return [item, item1];
}
function pushLux(item, item1) {
  let data1 = JSON.parse(fs.readFileSync("./JSON/dataCharts.json", "utf8"));
  data1.dataLux.push({
    anhsang: item,
    thoigian: item1,
  });
  let data2 = JSON.stringify(data1);
  fs.writeFileSync("../JSON/dataCharts.json", data2);
  return [item, item1];
}
function getDataChart() {
	return JSON.parse(fs.readFileSync("./JSON/dataCharts.json", "utf8"));
}
module.exports = {
	pushTemp,
	pushHumi,
	pushLux,
	getDataChart
}
