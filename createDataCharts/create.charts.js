const fs  = require('fs')
module.exports =  function() {
	var dataJson = [];
	let data1 = JSON.parse(fs.readFileSync('./JSON/data.json','utf8'));
	data1.map(function(item){
		let x = item.thoigian.split(" ");
		let y = x[2].split(":");
		let data = {
			dataLight: item.light,
			dataTime: item.thoigian,
			dataTemp: item.nhietdo,
			dataHumi: item.doam,
		}
		dataJson.push(data);
	})
	if(dataJson.length > 5 ){
		dataJson.splice(5, 95);
	}
	let data2 = JSON.stringify(dataJson.reverse());
	fs.writeFileSync('./JSON/dataCharts.json',data2);
	console.log(fs.readFileSync('./JSON/dataCharts.json','utf8'))
	return JSON.parse(fs.readFileSync('./JSON/dataCharts.json','utf8'));
}