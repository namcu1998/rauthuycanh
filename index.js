const {
  app,
  express,
  cookieParser,
  dotenv,
  bodyParser,
  AwakeHeroku,
  router,
  authRouter,
  Auth,
  io,
  server,
  middleware,
  dialogflow,
} = require("./requireLibary/lib");

const appdialogflow = dialogflow();

const esp = io.of("/espControll");
const esp1 = io.of("/espSensor");
const webapp = io.of("/webapp");
const appUse = require("./use/appUse");
require("./socketio/socketio")(esp, esp1, webapp);
require("./loopSync/loopSync")(esp, esp1, webapp);
appUse(app, express, bodyParser, middleware, esp, esp1, webapp, cookieParser);
require("./dialogflow/dialogflow")(appdialogflow);
require("./router/home.router").getSocket(webapp);
require("./data/clientData/clientData").getnameSpace(webapp, esp, esp1);
require("./data/espData/saveDataEsp").getSocket(webapp, esp, esp1);
const { historyData,
        clientData,
        chartData,
        espData } = require("./database/firebase");
const { getEspDataFromDatabase } = require("./data/espData/saveDataEsp");
const { getClientDataFromDatabase } = require("./data/clientData/clientData");
const { getChartDataFromDatabase } = require("./data/chartData/create.charts");
const { getHistoryDataFromDatabase } = require("./data/historyData/historyData");
// AwakeHeroku.add({
//   url: "https:nhanong.herokuapp.com",
// });

 
 espData.once("value", function (dataSnapshot) {
   if (dataSnapshot.val()) getEspDataFromDatabase(dataSnapshot.val());
 });

 clientData.once("value", function (dataSnapshot) {
   if (dataSnapshot.val()) getClientDataFromDatabase(dataSnapshot.val());
 });

 historyData.once("value", function (dataSnapshot) {
   if (dataSnapshot.val()) getHistoryDataFromDatabase(dataSnapshot.val());
 });

 chartData.once("value", function (dataSnapshot) {
   if (dataSnapshot.val()) getChartDataFromDatabase(dataSnapshot.val());
 });
 

server.listen(process.env.PORT || 3484);
app.use("/home", Auth.SetCookie, router);
app.use("/auth", authRouter);
app.get("/", function (req, res) {
  res.render("home/gioithieu");
});
app.post("/fulfillment", appdialogflow);
