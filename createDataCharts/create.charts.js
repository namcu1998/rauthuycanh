const fs  = require('fs')
module.exports =  function() {
	var dataJson = [];
	let data1 = JSON.parse(fs.readFileSync('data.json','utf8'));
	data1.map(function(item){
		let x = item.thoigian.split(" ");
		let y = x[2].split(":");
		let data = {
			dataLight: item.light,
			dataTime: y[2],
			dataTemp: item.nhietdo,
			dataHumi: item.doam,
		}
		dataJson.push(data);
	})
	if(dataJson.length > 50 ){
		dataJson.splice(50, 1);
	}
	let data2 = JSON.stringify(dataJson.reverse());
	fs.writeFileSync('dataCharts.json',data2);
	return JSON.parse(fs.readFileSync('dataCharts.json','utf8'));
}


