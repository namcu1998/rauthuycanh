const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const middleware = require("socketio-wildcard")();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const { dialogflow } = require("actions-on-google");
const { AwakeHeroku } = require("awake-heroku");
const { router } = require("../router/home.router");
const authRouter = require("../router/auth.router");
const Auth = require("../controllers/auth.controller");
const time = require("../time/time");
const { use } = require("../router/home.router");
const app = express();
const server = http.Server(app);
const io = socketio(server);
module.exports = {
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
};
