const fs  = require('fs')
function tempChange(tempChange) {
	let dataJson = [];
	let data1 = JSON.parse(fs.readFileSync('./JSON/data.json','utf8'));
	data1.map(function(item){
	let x = item.thoigian.split(" ");
	let y = x[3].split(":")[2];
	console.log(item)
	let data = {
		dataLight: item.light,
		dataTime: item.thoigian,
		dataTemp: item.nhietdo,
		dataHumi: item.doam,
	}
	dataJson.push(data);
	})
	if(dataJson.length > 5 ){
		dataJson.splice(5, 96);
	}
	let data2 = JSON.stringify(dataJson.reverse());
	fs.writeFileSync('./JSON/dataCharts.json',data2);
	return JSON.parse(fs.readFileSync('./JSON/dataCharts.json','utf8'));
}

module.exports = tempChange;