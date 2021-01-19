var admin = require("firebase-admin");
const fs  = require('fs');
const saveData = require("../saveDataBase/save").saveData;
var data2 = [];
const { saveAll } = require("../saveData/modeAndDataAuto/create.mode");
const { saveDb } = require("../saveData/createDataCharts/create.charts");
var serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rauthuycanh-d1aca-default-rtdb.firebaseio.com/"
});
var number = [];
var db = admin.database();
const dulieuDb = db.ref("data");
const data1 = db.ref("dulieudieukhien");
const dulieubieudo = db.ref("dulieubieudo");
dulieuDb.on("value", item => {
  for(let data in item.val()) {
    number.push(item.val()[data])
  }
  saveData(number);
})
data1.once("value", function (dataSnapshot) {
  saveAll(dataSnapshot.val());
});
dulieubieudo.once("value", function (dataSnapshot) {
  if(dataSnapshot.val())   saveDb(dataSnapshot.val());
});
module.exports = {
    dulieuDb,
    data1,
    dulieubieudo
}