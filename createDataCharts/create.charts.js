const fs  = require('fs')
module.exports =  function() {
	var dataJson = [];
	let data1 = JSON.parse(fs.readFileSync('data.json','utf8'));
	data1.map(function(item){
		let data = {
			dataLight: item.light,
			dataTime: item.thoigian,
			dataTemp: item.nhietdo,
			dataHumi: item.doam,
		}
		dataJson.push(data);
	})
	if(dataJson.length > 10 ){
		dataJson.splice(10, 40);
	}
	let data2 = JSON.stringify(dataJson);
	fs.writeFileSync('dataCharts.json',data2);
	return JSON.parse(fs.readFileSync('dataCharts.json','utf8'));
}


