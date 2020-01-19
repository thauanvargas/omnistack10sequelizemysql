const express = require("express");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
const { setupWebSocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebSocket(server);

app.use(cors());
app.use(express.json());

const db = require("../app/models");
// db.sequelize.sync();

//DEV
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(routes);

server.listen(3333);
