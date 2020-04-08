var ngay = ngay();
function ngay(){
  var date = new Date();
  var day1 = date.getDay()
  switch (day1) {
    case 0:
      return 'thứ hai';
    case 1:
      return 'thứ ba';
    case 2:
      return 'thứ tư';
    case 3:
      return 'thứ năm';
    case 4:
      return 'thứ sáu';
    case 5:
      return 'thứ bảy';
    case 6:
      return 'chủ nhật';
  }
}
function time(){
  var date = new Date();
  var array
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  var hours = date.getHours() + 7
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  array = (ngay + ' ' +  day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds)
  return array;
}
module.exports = time();
