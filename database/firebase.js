var admin = require("firebase-admin");
const fs  = require('fs');
var data = []
var serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nhayen-4b731.firebaseio.com/"
});
var number = 0;
var db = admin.database();
var data = db.ref("data");
var data1 = db.ref("arrayData")
// ref.remove()
//   .then(function() {
//    console.log("Remove succeeded.")
//   })
//   .catch(function(error) {
//    console.log("Remove failed: " + error.message)
//  });
data1.on('child_added', function(snapshot) {
  var message=snapshot.val();
  // console.log(message)
  var array1 = JSON.stringify(message);
  fs.writeFileSync('./JSON/mode.auto.json',array1);
});
module.exports.data = data
module.exports.data1 = data1