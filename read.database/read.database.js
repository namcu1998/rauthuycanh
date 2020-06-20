var fs  = require('fs')
function readFile(){
    let data = JSON.parse(fs.readFileSync('./JSON/data.json','utf8'))
    return data;
}
module.exports = readFile