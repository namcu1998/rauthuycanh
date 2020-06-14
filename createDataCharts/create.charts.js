const fs  = require('fs')
module.exports =  function(){
	let dataTemp = [];
	let dataTime = [];
	var dataJson = [
		{
			dataTemp: dataTemp,
		},
		{
			dataTime: dataTime,
		}
	];

	let data = JSON.parse(fs.readFileSync('data.json','utf8'));
	data.map(function(item){
		dataTemp.push(item.nhietdo);
		dataTime.push(item.thoigian);
	})
	if(dataTemp.length > 6 || dataTime.length > 6){
		dataTemp.splice(6, 44);
		dataTime.splice(6, 44);
	}
	let data1 = JSON.stringify(dataJson);
	fs.writeFileSync('dataCharts.json',data1);
	return JSON.parse(fs.readFileSync('dataCharts.json','utf8'));
}


