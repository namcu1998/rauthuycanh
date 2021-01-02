// var admin = require("firebase-admin");
// const fs  = require('fs');
// const dbase = require('../modeAndDataAuto/create.mode')
// var data2 = []
// var serviceAccount = require("../serviceAccountKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://nhayen-4b731.firebaseio.com/"
// });
// var number = 0;
// var db = admin.database();
// var data = db.ref("data");
// var data1 = db.ref("arrayData")
// ref.remove()
//   .then(function() {
//    console.log("Remove succeeded.")
//   })
//   .catch(function(error) {
//    console.log("Remove failed: " + error.message)
//  });
// data1.on('child_added', function(snapshot) {
//   var message=snapshot.val();
//   data2.push(message)
//   dbase.savePin(message[0], message[1], message[2])
//   if(data2.length > 1) {
//     data2 = [];
//     data1.remove()
//       .then(function() {  
//         data1.push(dbase.getModeAutoDriver())
//         console.log("Remove succeeded.")
//       })
//       .catch(function(error) {
//         console.log("Remove failed: " + error.message)
//       });
//   }
// });
// module.exports.data = data
// module.exports.data1 = data1