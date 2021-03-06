const express = require("express");
const app = express();
var cors = require('cors')

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //Permet de lire du json. Ne pas oublier d'avoir le header Content-Type avec comme valeur application/json
//https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Type
app.use(cors()) // Use this after the variable declaration

//Routes
app.get("/", (req, res) => {
  res.send(["<h1>E'Chat</h1>"].join(""));
});

const channelRoutes = require("./app/routes/channel");
app.use("/api/v1/channels", channelRoutes);

const userRoutes = require("./app/routes/user");
app.use("/api/v1/users", userRoutes);

const messageRoutes = require("./app/routes/message");
app.use("/api/v1/", messageRoutes);

const loginRoutes = require('./app/routes/login_routes');
app.use('/api/v1/login', loginRoutes);

module.exports = app;
