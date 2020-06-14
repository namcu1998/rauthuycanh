const fs  = require('fs')
module.exports =  function() {
	let dataLight = [];
	let dataTemp = [];
	let dataTime = [];
	var dataJson = [
		{
			dataLight: dataLight,
		},
		{
			dataTime: dataTime,
		},
		{
			dataTemp: dataTemp,
		}
	];

	let data = JSON.parse(fs.readFileSync('data.json','utf8'));
	data.map(function(item){
		dataLight.push(item.light);
		dataTime.push(item.thoigian);
		dataTemp.push(item.nhietdo);
	})
	if(dataLight.length > 10 || dataTime.length > 10 || dataTemp.length > 10){
		dataLight.splice(6, 40);
		dataTime.splice(6, 40);
		dataTemp.splice(6 ,40);
	}
	let data1 = JSON.stringify(dataJson);
	console.log(dataTemp)
	fs.writeFileSync('dataCharts.json',data1);
	return JSON.parse(fs.readFileSync('dataCharts.json','utf8'));
}


