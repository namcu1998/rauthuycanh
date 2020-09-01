var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nhayen-4b731.firebaseio.com/"
});
var number = 0;
var db = admin.database();
var ref = db.ref("data");
// ref.remove()
//   .then(function() {
//    console.log("Remove succeeded.")
//   })
//   .catch(function(error) {
//    console.log("Remove failed: " + error.message)
//  });
// ref.on('child_added', function(snapshot) {
//   var message=snapshot.val();
//   number = message.id
//   console.log(message)
//   fileSave(message.temp,message.humi,message.time,message.id)
// });
module.exports = ref