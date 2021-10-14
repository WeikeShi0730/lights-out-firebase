const express = require("express");
const path = require("path");
const app = express();

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  const cors = require("cors");
  var corsOptions = {
    origin: "http://localhost:3000",
  };
  app.use(cors(corsOptions));
}

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
