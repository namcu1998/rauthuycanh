const fs  = require('fs')
module.exports =  function(){
	let dataLight = [];
	let dataTime = [];
	var dataJson = [
		{
			dataLight: dataLight,
		},
		{
			dataTime: dataTime,
		}
	];

	let data = JSON.parse(fs.readFileSync('data.json','utf8'));
	data.map(function(item){
		dataLight.push(item.light);
		dataTime.push(item.thoigian);
	})
	if(dataLight.length > 12 || dataTime.length > 12){
		dataLight.splice(6, 38);
		dataTime.splice(6, 38);
	}
	let data1 = JSON.stringify(dataJson);
	fs.writeFileSync('dataCharts.json',data1);
	return JSON.parse(fs.readFileSync('dataCharts.json','utf8'));
}


