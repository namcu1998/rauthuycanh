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
  middleware
} = require("./requireLibary/lib");

const esp = io.of("/espControll");
const esp1 = io.of("/espSensor");
const webapp = io.of("/webapp");
const appUse = require("./use/appUse");
require("./socketio/socketio")(esp, esp1, webapp);
require("./loopSync/loopSync")(esp, esp1, webapp);

appUse(app, express, bodyParser, middleware, esp, esp1, webapp, cookieParser);

AwakeHeroku.add({
  url: "https://rauthuycanh.herokuapp.com",
});

server.listen(process.env.PORT || 3484);
app.use("/home", Auth.SetCookie, router);
app.use("/auth", authRouter);
app.get("/", function (req, res) {
  res.render("home/gioithieu");
});
