const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());

const db = require("../app/models");
// db.sequelize.sync();

//DEV
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(routes);

app.listen(3333);
