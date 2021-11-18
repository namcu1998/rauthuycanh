const admin = require("firebase-admin");
const fs = require("fs");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quickstart-1600242582049-default-rtdb.firebaseio.com/",
});

var db = admin.database();
const timeData = db.ref("timeData");
const clientData = db.ref("clientData");
const chartData = db.ref("chartData");
const historyData = db.ref("historyData");
const espData = db.ref("espData");

chartData.set([
  {
    "name": "Temperature",
    "labels": [0],
    "data1": [0],
    "data2": [0],
    "unit": "°C"
  },
  {
    "name": "Humidity",
    "labels": [0],
    "data1": [0],
    "data2": [0],
    "unit": "%"
  },
  {
    "name": "Light",
    "labels": [0],
    "data1": [0],
    "data2": [0],
    "unit": "Lux"
  },
  {
    "name": "Air",
    "labels": [0],
    "data1": [0],
    "data2": [0],
    "unit": "PPM"
  }
])

module.exports = {
  historyData,
  clientData,
  chartData,
  timeData,
  espData
};
