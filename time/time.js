const moment = require('moment-timezone')
function timeDay(){
    var ngay
    var array = [];
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
    array[0] = ngay;
    var time = moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    array[1] = time.split(":");
    var date = moment().tz("Asia/Ho_Chi_Minh").format('DD-MM-YYYY');
    array[2] = date.split("-");
    return array;
  }

  function getTime(){
    var ngay
    var array = [];
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
    array[0] = ngay;
    var time = moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    array[1] = time.split(":");
    var date = moment().tz("Asia/Ho_Chi_Minh").format('DD-MM-YYYY');
    array[2] = date.split("-");
    return ngay + " " + date + " " + time;
  }
function time(){
  return moment().tz("Asia/Ho_Chi_Minh").format("HH:mm");
}
function timeSecond(){
  var time =  moment().tz("Asia/Ho_Chi_Minh").format("ss");
  return time;
}
module.exports.time = time;
module.exports.timeDay = timeDay;
module.exports.getTime = getTime;
module.exports.timeSecond = timeSecond;