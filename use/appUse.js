var path = require("path");
module.exports = function appUse(app, express, bodyParser, middleware,  espControll, espSensor, webapp, cookieParser) {
  app.use(express.static("./public"));
  app.set("view engine", "ejs");
  app.set("views", "./views");
  app.use("/scripts", express.static(__dirname + "/node_modules/d3/"));
  app.use("/cssToggle", express.static(path.resolve(__dirname, '../bootstrapToggle/css/')));
  app.use("/jsToggle", express.static(path.resolve(__dirname, '../bootstrapToggle/js/')));
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(cookieParser());
  espControll.use(middleware);
  espSensor.use(middleware);
  webapp.use(middleware);
}
