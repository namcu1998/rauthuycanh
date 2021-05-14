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
  dialogflow
} = require("./requireLibary/lib");

const appdialogflow = dialogflow();

const esp = io.of("/espControll");
const esp1 = io.of("/espSensor");
const webapp = io.of("/webapp");
const appUse = require("./use/appUse");
require("./socketio/socketio")(esp, esp1, webapp);
require("./loopSync/loopSync")(esp, esp1, webapp);
require("./saveData/modeAndDataAuto/create.mode").pushDb(require("./database/firebase").data1)
appUse(app, express, bodyParser, middleware, esp, esp1, webapp, cookieParser);
require("./dialogflow/dialogflow")(appdialogflow, webapp);
require()
AwakeHeroku.add({
  url: "https://rauthuycanh.herokuapp.com",
});

server.listen(process.env.PORT || 3484);
app.use("/home", Auth.SetCookie, router);
app.use("/auth", authRouter);
app.get("/", function (req, res) {
  res.render("home/gioithieu");
});
app.post("/fulfillment", appdialogflow);
