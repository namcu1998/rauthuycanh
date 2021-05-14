const admin = require("firebase-admin");
const fs = require("fs");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nhanam-18510-default-rtdb.firebaseio.com/",
});

var db = admin.database();
const timeData = db.ref("timeData");
const clientData = db.ref("clientData");
const chartData = db.ref("chartData");
const historyData = db.ref("historyData");
const espData = db.ref("espData");

module.exports = {
  historyData,
  clientData,
  chartData,
  timeData,
  espData
};
