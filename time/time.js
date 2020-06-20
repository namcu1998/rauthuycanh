const moment = require('moment-timezone')
function timeDay(){
    var ngay
    var day = moment().tz("Asia/Ho_Chi_Minh").format('dddd');
    switch(day){
      case 'Monday':
        ngay = 'thứ hai'
        break;
      case 'Tuesday':
        ngay = 'thứ ba'
        break;
      case 'Wednesday':
        ngay = 'thứ tư'
        break;
      case 'Thursday':
        ngay = 'thứ năm'
        break;
      case 'Friday':
        ngay = 'thứ sáu'
        break;
      case 'Saturday':
        ngay = 'thứ bảy'
        break;
      case 'Sunday':
        ngay = 'chủ nhật'
        break;
    }
    var date = moment().tz("Asia/Ho_Chi_Minh").format('DD-MM-YYYY');
    return ngay
  }

function time(){
  return moment().tz("Asia/Ho_Chi_Minh").format("HH:mm");
}

module.exports.time = time;
module.exports.timeDay = timeDay;