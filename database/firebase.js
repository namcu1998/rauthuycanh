var admin = require("firebase-admin");
const fs  = require('fs');
var data2 = []
var serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rauthuycanh-d1aca-default-rtdb.firebaseio.com/"
});
var number = 0;
var db = admin.database();
const dulieuDb = db.ref("data");
const data1 = db.ref("dulieudieukhien")
// ref.remove()
//   .then(function() {
//    console.log("Remove succeeded.")
//   })
//   .catch(function(error) {
//    console.log("Remove failed: " + error.message)
//  });
module.exports = {
    dulieuDb,
    data1
}